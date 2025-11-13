import { type NextRequest, NextResponse } from "next/server"
import { ingestImage } from "@/lib/image-storage"
import { getNeutralsData, getAdvisorsData } from "@/lib/notion-data"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Starting forced image migration...")

    // Get all people data
    const [neutrals, advisors] = await Promise.all([getNeutralsData(), getAdvisorsData()])

    const allPeople = [...neutrals, ...advisors]
    console.log(`[v0] Found ${allPeople.length} people to process`)

    const results = []

    for (const person of allPeople) {
      if (person.photo_url) {
        console.log(`[v0] Processing ${person.name}: ${person.photo_url}`)
        try {
          const canonicalUrl = await ingestImage(
            person.photo_url,
            `${person.name.replace(/\s+/g, "-").toLowerCase()}.jpg`,
          )
          console.log(`[v0] Success for ${person.name}: ${canonicalUrl}`)
          results.push({ name: person.name, success: true, url: canonicalUrl })
        } catch (error) {
          console.log(`[v0] Failed for ${person.name}:`, error)
          results.push({ name: person.name, success: false, error: error.message })
        }
      } else {
        console.log(`[v0] No photo URL for ${person.name}`)
        results.push({ name: person.name, success: false, error: "No photo URL" })
      }
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
    })
  } catch (error) {
    console.error("[v0] Migration failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}

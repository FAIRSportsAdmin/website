import { type NextRequest, NextResponse } from "next/server"
import { getNeutrals, getAdvisorsData } from "@/lib/notion-data"
import { ingestImage } from "@/lib/image-storage"

export async function POST(request: NextRequest) {
  try {
    const { dryRun = false } = await request.json()

    const [neutrals, advisors] = await Promise.all([getNeutrals(), getAdvisorsData()])

    const allPeople = [
      ...neutrals.map((p) => ({ ...p, type: "neutral" })),
      ...advisors.map((p) => ({ ...p, type: "advisor" })),
    ]

    const results = []

    for (const person of allPeople) {
      if (
        !person.photo ||
        person.photo.includes("blob.vercel-storage.com") ||
        person.photo.includes("placeholder.svg")
      ) {
        if (dryRun) {
          results.push({
            personId: person.id || person.title,
            type: person.type,
            status: "skipped",
            reason: "No photo, already canonical, or placeholder",
          })
        }
        continue
      }

      if (dryRun) {
        results.push({
          personId: person.id || person.title,
          type: person.type,
          status: "would-migrate",
          originalUrl: person.photo,
        })
        continue
      }

      const personId = person.slug || person.id || person.title.replace(/\s+/g, "-").toLowerCase()
      const result = await ingestImage(person.photo, personId)

      results.push({
        personId,
        type: person.type,
        status: result.success ? "migrated" : "failed",
        originalUrl: person.photo,
        canonicalUrl: result.canonicalUrl,
        error: result.error,
      })

      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    const summary = {
      success: true,
      totalProcessed: allPeople.length,
      migrated: results.filter((r) => r.status === "migrated").length,
      failed: results.filter((r) => r.status === "failed").length,
      skipped: allPeople.length - results.length, // Count skipped items not in results
      byType: {
        neutrals: allPeople.filter((p) => p.type === "neutral").length,
        advisors: allPeople.filter((p) => p.type === "advisor").length,
      },
      results: dryRun ? results : results.filter((r) => r.status !== "skipped"),
    }

    return NextResponse.json(summary)
  } catch (error) {
    console.error("Migration API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

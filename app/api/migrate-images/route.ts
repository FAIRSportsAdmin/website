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
        results.push({
          personId: person.id || person.title,
          type: person.type,
          status: "skipped",
          reason: "No photo, already canonical, or placeholder",
        })
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

      // Add delay to avoid overwhelming the system
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    const summary = {
      success: true,
      totalProcessed: results.length,
      migrated: results.filter((r) => r.status === "migrated").length,
      failed: results.filter((r) => r.status === "failed").length,
      skipped: results.filter((r) => r.status === "skipped").length,
      byType: {
        neutrals: results.filter((r) => r.type === "neutral").length,
        advisors: results.filter((r) => r.type === "advisor").length,
      },
      results: dryRun ? results.slice(0, 20) : results.filter((r) => r.status !== "skipped"), // Show more in dry run, hide skipped in real run
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

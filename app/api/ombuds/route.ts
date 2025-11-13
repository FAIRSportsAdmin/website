import { NextResponse } from "next/server"
import { getOmbudsData, getOmbudsBySlug } from "@/lib/notion-data"
import { renderNotionBlocks } from "@/lib/notion-render"

export async function GET() {
  try {
    const ombuds = await getOmbudsData()
    console.log(
      "[v0] Ombuds API - Initial ombuds data:",
      ombuds.map((o) => ({
        title: o.title,
        slug: o.slug,
        hasBody: !!o.body?.length,
        bodyLength: o.body?.length || 0,
      })),
    )

    const ombudsWithHTML = await Promise.all(
      ombuds.map(async (ombud) => {
        console.log(`[v0] Processing ombud ${ombud.title} with slug: ${ombud.slug}`)

        const fullOmbud = await getOmbudsBySlug(ombud.slug)
        console.log(`[v0] Full ombud data for ${ombud.title}:`, {
          hasFullOmbud: !!fullOmbud,
          hasBody: !!fullOmbud?.body?.length,
          bodyLength: fullOmbud?.body?.length || 0,
        })

        const bodyHTML = fullOmbud?.body?.length ? renderNotionBlocks(fullOmbud.body) : ""
        console.log(`[v0] Rendered HTML for ${ombud.title}:`, {
          bodyHTMLLength: bodyHTML.length,
          hasContent: bodyHTML.length > 0,
        })

        return { ...ombud, bodyHTML }
      }),
    )

    console.log(
      "[v0] Final ombuds with HTML:",
      ombudsWithHTML.map((o) => ({
        title: o.title,
        hasBodyHTML: !!o.bodyHTML,
        bodyHTMLLength: o.bodyHTML?.length || 0,
      })),
    )

    return NextResponse.json(ombudsWithHTML)
  } catch (error) {
    console.error("[v0] Failed to fetch ombuds:", error)
    return NextResponse.json({ error: "Failed to fetch ombuds" }, { status: 500 })
  }
}

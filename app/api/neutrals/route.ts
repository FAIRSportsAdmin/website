import { NextResponse } from "next/server"
import { getNeutralsData, getNeutralBySlug } from "@/lib/notion-data"

export async function GET() {
  try {
    const neutrals = await getNeutralsData()

    const neutralsWithHTML = await Promise.all(
      neutrals.map(async (neutral) => {
        try {
          // Fetch full neutral data including page body
          const fullNeutral = await getNeutralBySlug(neutral.slug)

          if (fullNeutral?.body && fullNeutral.body.length > 0) {
            // Extract text from the first few blocks for preview
            const textBlocks = fullNeutral.body
              .filter((block: any) => block.type === "paragraph" && block.paragraph?.rich_text?.length > 0)
              .slice(0, 3) // Take first 3 paragraphs

            const paragraphs = textBlocks
              .map((block: any) => {
                const text = block.paragraph.rich_text.map((t: any) => t.plain_text).join("")
                return `<p>${text}</p>`
              })
              .join("")

            return {
              ...neutral,
              bodyHTML: paragraphs || neutral.full_bio ? `<p>${neutral.full_bio}</p>` : "",
            }
          }
        } catch (error) {
          console.error(`[v0] Failed to fetch body for neutral ${neutral.slug}:`, error)
        }

        // Fallback to full_bio property if page content fetch fails
        return {
          ...neutral,
          bodyHTML: neutral.full_bio
            ? `<p>${neutral.full_bio.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>")}</p>`
            : "",
        }
      }),
    )

    return NextResponse.json(neutralsWithHTML)
  } catch (error) {
    console.error("[v0] Failed to fetch neutrals:", error)
    return NextResponse.json({ error: "Failed to fetch neutrals" }, { status: 500 })
  }
}

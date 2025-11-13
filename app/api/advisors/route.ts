import { NextResponse } from "next/server"
import { getAdvisorsData, getAdvisorBySlug } from "@/lib/notion-data"

export async function GET() {
  try {
    const advisors = await getAdvisorsData()

    const advisorsWithHTML = await Promise.all(
      advisors.map(async (advisor) => {
        try {
          // Fetch full advisor data including page body
          const fullAdvisor = await getAdvisorBySlug(advisor.slug)

          if (fullAdvisor?.body && fullAdvisor.body.length > 0) {
            // Extract text from the first few blocks for preview
            const textBlocks = fullAdvisor.body
              .filter((block: any) => block.type === "paragraph" && block.paragraph?.rich_text?.length > 0)
              .slice(0, 3) // Take first 3 paragraphs

            const paragraphs = textBlocks
              .map((block: any) => {
                const text = block.paragraph.rich_text.map((t: any) => t.plain_text).join("")
                return `<p>${text}</p>`
              })
              .join("")

            return {
              ...advisor,
              bodyHTML: paragraphs || advisor.bio ? `<p>${advisor.bio}</p>` : "",
            }
          }
        } catch (error) {
          console.error(`[v0] Failed to fetch body for advisor ${advisor.slug}:`, error)
        }

        // Fallback to bio property if page content fetch fails (but skip if it's Lorem Ipsum)
        const bioText = advisor.bio && !advisor.bio.includes("Lorem Ipsum") ? advisor.bio : ""
        return {
          ...advisor,
          bodyHTML: bioText ? `<p>${bioText.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>")}</p>` : "",
        }
      }),
    )

    return NextResponse.json(advisorsWithHTML)
  } catch (error) {
    console.error("[v0] Failed to fetch advisors:", error)
    return NextResponse.json({ error: "Failed to fetch advisors" }, { status: 500 })
  }
}

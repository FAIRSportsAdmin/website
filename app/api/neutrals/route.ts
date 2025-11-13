import { NextResponse } from "next/server"
import { getNeutralsData, getNeutralBySlug } from "@/lib/notion-data"
import { renderNotionBlocks } from "@/lib/notion-render"

export async function GET() {
  try {
    const neutrals = await getNeutralsData()

    const neutralsWithHTML = await Promise.all(
      neutrals.map(async (neutral) => {
        const fullNeutral = await getNeutralBySlug(neutral.slug)
        const bodyHTML = fullNeutral?.body?.length ? renderNotionBlocks(fullNeutral.body) : ""
        return { ...neutral, bodyHTML }
      }),
    )

    return NextResponse.json(neutralsWithHTML)
  } catch (error) {
    console.error("[v0] Failed to fetch neutrals:", error)
    return NextResponse.json({ error: "Failed to fetch neutrals" }, { status: 500 })
  }
}

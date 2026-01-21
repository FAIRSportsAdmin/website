import { getNeutralsData } from "@/lib/notion-data"
import { renderNotionBlocks } from "@/lib/notion-render"
import NeutralsFilteredListClient from "./neutrals-filtered-list-client"

const FILTER_OPTIONS = ["Arbitrator", "Mediator"]

export default async function NeutralsFilteredList() {
  const neutrals = await getNeutralsData()

  const neutralsWithHTML = neutrals.map((neutral) => {
    const bodyHTML = neutral.body?.length ? renderNotionBlocks(neutral.body) : ""
    console.log("[v0] SERVER: Neutral", neutral.title, "body blocks:", neutral.body?.length || 0, "bodyHTML length:", bodyHTML.length)
    return { ...neutral, bodyHTML }
  })

  return <NeutralsFilteredListClient neutrals={neutralsWithHTML} />
}

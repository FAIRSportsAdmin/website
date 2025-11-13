import { getNeutralsData } from "@/lib/notion-data"
import { renderNotionBlocks } from "@/lib/notion-render"
import NeutralsFilteredListClient from "./neutrals-filtered-list-client"

const FILTER_OPTIONS = ["Arbitrator", "Mediator"]

export default async function NeutralsFilteredList() {
  const neutrals = await getNeutralsData()

  const neutralsWithHTML = neutrals.map((neutral) => {
    const bodyHTML = neutral.body?.length ? renderNotionBlocks(neutral.body) : ""
    return { ...neutral, bodyHTML }
  })

  return <NeutralsFilteredListClient neutrals={neutralsWithHTML} />
}

import { getNeutralsData } from "@/lib/notion-data"
import { renderNotionBlocks } from "@/lib/notion-render"
import { PersonGrid } from "@/components/common/person-grid"

export default async function NeutralsListServer() {
  const neutrals = await getNeutralsData()

  const neutralsWithHTML = await Promise.all(
    neutrals.map(async (neutral) => {
      const bodyHTML = neutral.body?.length ? renderNotionBlocks(neutral.body) : ""
      return { ...neutral, bodyHTML }
    }),
  )

  return <PersonGrid items={neutralsWithHTML} type="neutral" />
}

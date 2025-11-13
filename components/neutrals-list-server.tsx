import { getNeutralsData, getNeutralBySlug } from "@/lib/notion-data"
import { renderNotionBlocks } from "@/lib/notion-render"
import { PersonGrid } from "@/components/common/person-grid"

export default async function NeutralsListServer() {
  const neutrals = await getNeutralsData()

  const neutralsWithHTML = await Promise.all(
    neutrals.map(async (neutral) => {
      const fullNeutral = await getNeutralBySlug(neutral.slug)
      const bodyHTML = fullNeutral?.body?.length ? renderNotionBlocks(fullNeutral.body) : ""
      return { ...neutral, bodyHTML }
    }),
  )

  return <PersonGrid items={neutralsWithHTML} type="neutral" />
}

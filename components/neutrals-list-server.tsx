import { getNeutralsData } from "@/lib/notion-data"
import { renderNotionBlocks } from "@/lib/notion-render"
import { PersonGrid } from "@/components/common/person-grid"

export default async function NeutralsListServer() {
  const neutrals = await getNeutralsData()

  console.log(
    "[v0] Neutrals data - first 3 items:",
    neutrals.slice(0, 3).map((n) => ({
      title: n.title,
      photo: n.photo,
    })),
  )

  const neutralsWithHTML = await Promise.all(
    neutrals.map(async (neutral) => {
      const bodyHTML = neutral.body?.length ? renderNotionBlocks(neutral.body) : ""
      return { ...neutral, bodyHTML }
    }),
  )

  return <PersonGrid items={neutralsWithHTML} type="neutral" />
}

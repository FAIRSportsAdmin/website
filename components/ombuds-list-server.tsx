import { getOmbudsData } from "@/lib/notion-data"
import { renderNotionBlocks } from "@/lib/notion-render"
import { PersonGrid } from "@/components/common/person-grid"

export default async function OmbudsListServer() {
  const ombuds = await getOmbudsData()

  const sortedOmbuds = ombuds.sort((a, b) => a.title.localeCompare(b.title))

  const ombudsWithHTML = sortedOmbuds.map((ombud) => {
    const bodyHTML = ombud.body?.length ? renderNotionBlocks(ombud.body) : ""
    return { ...ombud, bodyHTML }
  })

  return <PersonGrid items={ombudsWithHTML} type="ombud" />
}

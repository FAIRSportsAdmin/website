"use server"
import { getAdvisorsData } from "@/lib/notion-data"
import { renderNotionBlocks } from "@/lib/notion-render"
import { PersonGrid } from "@/components/common/person-grid"

export default async function AdvisorsListServer() {
  const advisors = await getAdvisorsData()

  const advisorsWithHTML = await Promise.all(
    advisors.map(async (advisor) => {
      const bodyHTML = advisor.body?.length ? renderNotionBlocks(advisor.body) : ""
      return { ...advisor, bodyHTML }
    }),
  )

  return <PersonGrid items={advisorsWithHTML} type="advisor" />
}

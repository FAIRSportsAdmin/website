"use server"
import { getAdvisorsData } from "@/lib/notion-data"
import { renderNotionBlocks } from "@/lib/notion-render"
import { PersonGrid } from "@/components/common/person-grid"

export default async function AdvisorsListServer() {
  const advisors = await getAdvisorsData()

  const advisorsWithHTML = advisors.map((advisor) => {
    const bodyHTML = advisor.body?.length ? renderNotionBlocks(advisor.body) : ""
    const tags = advisor.title.includes("George Pyne") ? [...(advisor.tags || []), "Investor"] : advisor.tags

    return { ...advisor, bodyHTML, tags }
  })

  return <PersonGrid items={advisorsWithHTML} type="advisor" />
}

"use server"
import { getAdvisorsData } from "@/lib/notion-data"
import { renderNotionBlocks } from "@/lib/notion-render"
import { PersonGrid } from "@/components/common/person-grid"

export default async function AdvisorsListServer() {
  const advisors = await getAdvisorsData()

  console.log(
    "[v0] Advisors data - first 3 items:",
    advisors.slice(0, 3).map((a) => ({
      title: a.title,
      photo: a.photo,
    })),
  )

  const advisorsWithHTML = advisors.map((advisor) => {
    const bodyHTML = advisor.body?.length ? renderNotionBlocks(advisor.body) : ""
    const tags = advisor.title.includes("George Pyne") ? [...(advisor.tags || []), "Investor Only"] : advisor.tags

    return { ...advisor, bodyHTML, tags }
  })

  return <PersonGrid items={advisorsWithHTML} type="advisor" />
}

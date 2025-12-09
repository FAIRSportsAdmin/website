import { getOmbudsData } from "@/lib/notion-data"
import { renderNotionBlocks } from "@/lib/notion-render"
import { PersonGrid } from "@/components/common/person-grid"

export default async function OmbudsListServer() {
  const ombuds = await getOmbudsData()

  console.log(
    "[v0] Ombuds data:",
    ombuds.map((o) => ({
      title: o.title,
      photo: o.photo,
    })),
  )

  const ombudsWithHTML = ombuds.map((ombud) => {
    const bodyHTML = ombud.body?.length ? renderNotionBlocks(ombud.body) : ""
    return { ...ombud, bodyHTML }
  })

  const customOrder = ["Briggs", "Gordon", "Harmon", "Shropshire"]

  const sortedOmbuds = ombudsWithHTML.sort((a, b) => {
    // Extract last name: find the first word after first name that doesn't end with a period
    // This handles cases like "Joshua A. Gordon, JD, MA" where "A." is a middle initial
    const getLastName = (title: string) => {
      const parts = title.split(" ")
      if (parts.length > 1) {
        // Skip the first name and find the first substantial word (not ending with .)
        for (let i = 1; i < parts.length; i++) {
          const word = parts[i].replace(/[,.]/g, "")
          // If word doesn't end with period and isn't empty, it's likely the last name
          if (word && !parts[i].endsWith(".")) {
            return word
          }
        }
      }
      return title
    }

    const lastNameA = getLastName(a.title)
    const lastNameB = getLastName(b.title)

    const indexA = customOrder.indexOf(lastNameA)
    const indexB = customOrder.indexOf(lastNameB)

    // If both are in custom order, use that order
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB
    }

    // Otherwise fall back to alphabetical by last name
    return lastNameA.localeCompare(lastNameB)
  })

  return <PersonGrid items={sortedOmbuds} type="ombud" />
}

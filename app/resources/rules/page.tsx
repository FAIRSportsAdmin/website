import { getRulesPageContent } from "@/lib/notion-data"
import { renderRulesHTML } from "@/lib/notion-render" // <-- use the new function
import RulesPageClient from "@/components/rules-page-client"
import { headers } from "next/headers"

export default async function RulesPage() {
  const headersList = headers()
  const timestamp = Date.now()

  const blocks = await getRulesPageContent()
  const html = renderRulesHTML(blocks)

  console.log(`[v0] Rules page rendered at ${timestamp} with ${blocks.length} blocks`)

  return <RulesPageClient rulesContent={html} />
}

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"
export const runtime = "nodejs"

import { PageLayout } from "@/components/layout/page-layout"
import { createMetadata } from "@/lib/metadata"
import { Suspense } from "react"
import { PersonGridSkeleton } from "@/components/common/loading-states"
import NeutralsFilteredList from "@/components/neutrals-filtered-list"
import { headers } from "next/headers"

export const metadata = createMetadata({
  title: "Arbitrators & Mediators", // Updated title to match new naming
  description:
    "Meet our experienced neutrals with backgrounds as general counsels, sports agents, professors, and Olympic arbitrators. Authorities on the shifting college sports industry.",
  path: "/neutrals",
})

export const dynamic = "force-dynamic" // Ensure fresh Notion URLs are fetched at request time, not build time
export const revalidate = 0 // No caching at all

export default function NeutralsPage() {
  const headersList = headers()
  const timestamp = Date.now()

  return (
    <PageLayout
      title="Arbitrators & Mediators" // Updated title to match new naming
      description="FAIR Sports neutrals have experience as club and league general counsels, media and entertainment executives, trailblazing sports agents, award-winning professors, big firm lawyers, federal law clerks, industry-leading authors, Olympic arbitrators, and former college athletes. They are regularly cited as authorities on the shifting college sports industry."
      background="gray-50"
    >
      <Suspense fallback={<PersonGridSkeleton count={8} />}>
        <NeutralsFilteredList key={timestamp} />
      </Suspense>
    </PageLayout>
  )
}

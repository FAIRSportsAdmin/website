import { PageLayout } from "@/components/layout/page-layout"
import { createMetadata } from "@/lib/metadata"
import { Suspense } from "react"
import { PersonGridSkeleton } from "@/components/common/loading-states"
import AdvisorsListServer from "@/components/advisors-list-server"

export const metadata = createMetadata({
  title: "Leadership & Advisors",
  description:
    "Meet the experienced leaders and advisors who guide FAIR Sports and understand the complexities of college athletics.",
  path: "/advisors-and-leadership",
})

export const revalidate = 86400 // Revalidate every 24 hours

export default function AdvisorsPage() {
  return (
    <PageLayout
      title="Leadership & Advisors"
      description="Guided by experienced leaders and advisors who understand the complexities of college athletics"
      background="gray-50"
    >
      <Suspense fallback={<PersonGridSkeleton count={8} />}>
        <AdvisorsListServer />
      </Suspense>
    </PageLayout>
  )
}

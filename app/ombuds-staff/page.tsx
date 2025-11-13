import { PageLayout } from "@/components/layout/page-layout"
import { createMetadata } from "@/lib/metadata"
import { Suspense } from "react"
import { PersonGridSkeleton } from "@/components/common/loading-states"
import OmbudsListServer from "@/components/ombuds-list-server"

export const metadata = createMetadata({
  title: "Ombuds Staff",
  description:
    "Meet our confidential ombuds staff who provide independent, neutral support for dispute resolution in college sports.",
  path: "/ombuds-staff",
})

export const revalidate = 3600

export default function OmbudsStaffPage() {
  return (
    <PageLayout
      title="Ombuds Staff"
      description="Our ombuds staff provide confidential, independent support for resolving disputes in college sports. They serve as neutral advocates to help parties find fair solutions."
      background="gray-50"
    >
      <Suspense fallback={<PersonGridSkeleton count={3} />}>
        <OmbudsListServer />
      </Suspense>
    </PageLayout>
  )
}

import { PageLayout } from "@/components/layout/page-layout"
import { PersonGridSkeleton } from "@/components/common/loading-states"

export default function Loading() {
  return (
    <PageLayout
      title="Leadership & Advisors"
      description="Guided by experienced leaders and advisors who understand the complexities of college athletics"
      background="gray-50"
    >
      <PersonGridSkeleton count={8} />
    </PageLayout>
  )
}

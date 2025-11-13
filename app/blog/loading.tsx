import { PageLayout } from "@/components/layout/page-layout"
import { BlogGridSkeleton } from "@/components/common/loading-states"

export default function Loading() {
  return (
    <PageLayout
      title="FAIR Sports Blog"
      description="Insights, analysis, and expert perspectives on college sports dispute resolution"
      background="gray-50"
    >
      <div className="animate-pulse">
        <div className="mb-12 h-24 bg-gray-200 rounded-lg" />
        <BlogGridSkeleton count={6} />
      </div>
    </PageLayout>
  )
}

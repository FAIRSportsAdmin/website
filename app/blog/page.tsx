import { PageLayout } from "@/components/layout/page-layout"
import { createMetadata } from "@/lib/metadata"
import { Suspense } from "react"
import { BlogGridSkeleton } from "@/components/common/loading-states"
import BlogListServer from "@/components/blog-list-server"

export const metadata = createMetadata({
  title: "Insights",
  description: "Analysis and thought leadership on dispute resolution in sports and beyond from the FAIR Sports team.",
  path: "/blog",
})

export const revalidate = 3600 // Revalidate every hour

export default function BlogPage() {
  return (
    <PageLayout
      title="FAIR Sports Insights"
      description="Analysis and thought leadership on dispute resolution in sports and beyond"
      background="gray-50"
    >
      <Suspense
        fallback={
          <div>
            <div className="mb-12 h-24 bg-gray-200 rounded-lg animate-pulse" />
            <BlogGridSkeleton count={6} />
          </div>
        }
      >
        <BlogListServer />
      </Suspense>
    </PageLayout>
  )
}

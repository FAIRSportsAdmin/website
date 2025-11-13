import { BlogGridSkeleton } from "@/components/common/loading-states"

export function BlogPreviewSkeleton() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading skeleton */}
        <div className="text-center mb-16">
          <div className="h-8 md:h-10 w-48 md:w-72 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-5 md:h-6 w-[75%] max-w-3xl bg-gray-200 rounded mx-auto animate-pulse" />
        </div>

        {/* Cards skeleton */}
        <BlogGridSkeleton count={3} />

        {/* Button skeleton */}
        <div className="text-center mt-12">
          <div className="h-12 w-48 bg-gray-200 rounded-lg mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  )
}

"use client"

export function PersonCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-md bg-white">
      <div className="aspect-[4/5] relative bg-gray-100">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="h-6 bg-gray-300 rounded mb-2 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function BlogCardSkeleton() {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="aspect-video bg-gray-200 animate-pulse" />
      <div className="p-6">
        <div className="flex gap-2 mb-3">
          <div className="h-5 bg-gray-200 rounded-full w-16 animate-pulse" />
          <div className="h-5 bg-gray-200 rounded-full w-20 animate-pulse" />
        </div>
        <div className="h-6 bg-gray-300 rounded mb-2 animate-pulse" />
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
      </div>
    </div>
  )
}

export function PersonGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <PersonCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function BlogGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  )
}

"use client"

import type { NotionBlogPost } from "@/lib/notion-data"

interface BlogListClientProps {
  blogPosts: NotionBlogPost[]
  allTags: string[]
}

export default function BlogListClient({ blogPosts, allTags }: BlogListClientProps) {
  return (
    <div className="text-center py-12">
      <div className="bg-white rounded-2xl shadow-lg p-12">
        <h3 className="text-2xl font-bold text-navy mb-4">Coming Soon</h3>
        <p className="text-gray-500 text-lg mb-4">Our insights content is currently being prepared.</p>
        <p className="text-gray-400">Check back soon for new articles on sports dispute resolution!</p>
      </div>
    </div>
  )
}

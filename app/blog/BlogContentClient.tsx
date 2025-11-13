"use client"

import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

function BlogContentClient({ blogPosts, allTags }: { blogPosts: any[]; allTags: string[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag))
    return matchesSearch && matchesTag
  })

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTag(null)
  }

  return (
    <>
      {/* Search and Filter */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-gray-300 focus:border-accord"
            />
          </div>
          {(searchQuery || selectedTag) && (
            <Button
              onClick={clearFilters}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 text-gray-600 px-6 bg-transparent"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-navy mr-2">Filter by topic:</span>
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedTag === tag
                    ? "bg-fair-blue text-white hover:bg-fair-blue/90"
                    : "hover:bg-sky/10 border-sky text-navy"
                }`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Blog Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : searchQuery || selectedTag ? (
        <div className="text-center py-12">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <p className="text-gray-500 text-lg mb-4">
              No articles found
              {searchQuery && ` for "${searchQuery}"`}
              {selectedTag && ` in "${selectedTag}"`}
            </p>
            <p className="text-gray-400">Try a different search term or topic, or browse all articles.</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <p className="text-gray-500 text-lg mb-4">No blog posts found.</p>
            <p className="text-gray-400">Check back soon for new content!</p>
          </div>
        </div>
      )}
    </>
  )
}

export default BlogContentClient

import { getBlogPostsData } from "@/lib/notion-data"
import BlogListClient from "./blog-list-client"

export default async function BlogListServer() {
  const blogPosts = await getBlogPostsData()
  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags || [])))

  // Render the client component and pass the data as props
  return <BlogListClient blogPosts={blogPosts} allTags={allTags} />
}

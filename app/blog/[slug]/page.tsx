import { getBlogPostBySlug, getBlogPostsData } from "@/lib/notion-data"
import { renderNotionBlocks } from "@/lib/notion-render"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react'
import Link from "next/link"
import { createMetadata } from "@/lib/metadata"
import Image from "next/image"

export const revalidate = 3600

export async function generateStaticParams() {
  const posts = await getBlogPostsData()
  return posts
    .map((p) => p.slug)
    .filter((slug): slug is string => !!slug && slug.trim().length > 0)
  .map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = await getBlogPostBySlug(slug)
  if (!post) {
    return createMetadata({
      title: "Post Not Found",
      description: "The blog post you're looking for could not be found.",
    })
  }
  return createMetadata({
    title: post.title,
    description: post.excerpt || `Read ${post.title} on the FAIR Sports blog.`,
    path: `/blog/${post.slug}`,
    image: post.cover_image,
  })
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="text-navy hover:text-accord">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        <article>
          <header className="mb-8">
            {post!.tags && post!.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post!.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-sky/10 text-navy">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-ink mb-6 leading-tight">{post!.title}</h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600 mb-6">
              {post!.author && (
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{post!.author}</span>
                </div>
              )}
              {post!.publish_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(post!.publish_date)}</span>
                </div>
              )}
              <Button variant="ghost" size="sm" className="text-accord hover:text-accord/80 sm:ml-auto">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            {post!.cover_image && (
              <div className="aspect-video rounded-2xl overflow-hidden shadow-lg mb-8 relative">
                <Image
                  src={post!.cover_image || "/placeholder.svg"}
                  alt={post!.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority={false}
                />
              </div>
            )}
          </header>

          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mb-8">
            <div className="notion-content text-gray-700" dangerouslySetInnerHTML={{ __html: renderNotionBlocks(post!.body) }} />
          </div>

          <footer className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {post!.tags && post!.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-navy">Tags:</span>
                  {post!.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-sky text-navy hover:bg-sky/10">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <Button className="bg-accord hover:bg-accord/90 text-white">Share Article</Button>
            </div>
          </footer>
        </article>
      </div>
    </div>
  )
}

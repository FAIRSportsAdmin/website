"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, FileText } from 'lucide-react'
import { motion } from "framer-motion"
import { cardHover, fadeInUp } from "@/lib/animations"
import type { NotionBlogPost } from "@/lib/notion-data"

interface BlogCardProps {
  post: NotionBlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <motion.div variants={fadeInUp} whileHover="hover" {...cardHover} className="group">
      <Card className="bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-0 h-full flex flex-col">
        {post.cover_image ? (
          <div className="aspect-video overflow-hidden relative bg-gray-100">
            <Image
              src={post.cover_image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
            />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-navy/10 to-accord/10 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm font-medium">Article</p>
            </div>
          </div>
        )}

        <div className="flex flex-col flex-grow p-6">
          <CardHeader className="p-0 pb-4">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-sky/10 text-navy text-xs border-0">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <CardTitle className="text-xl font-bold text-navy leading-tight hover:text-accord transition-colors group">
              <Link href={`/blog/${post.slug}`} className="group-hover:text-accord">
                {post.title}
              </Link>
            </CardTitle>

            <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
              {post.publish_date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publish_date)}</span>
                </div>
              )}
              {post.author && (
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-0 flex-grow">
            <CardDescription className="text-gray-600 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</CardDescription>
          </CardContent>

          <div className="mt-auto pt-4">
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center text-accord hover:text-accord/80 font-medium transition-colors group"
            >
              Read More
              <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

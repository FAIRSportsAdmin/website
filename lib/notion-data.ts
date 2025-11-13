import "server-only"
import type { Client } from "@notionhq/client"
import { cached } from "./cache"
import { getCanonicalImageUrl } from "./image-storage"
import { queryDataSource, getResolvedDataSourceId } from "./notion"
import { getNotionClient } from "./notion"

const notion: Client | null = null

const DATABASES = {
  NEUTRALS: process.env.NOTION_NEUTRALS_DB_ID!,
  ADVISORS: process.env.NOTION_ADVISORS_DB_ID!,
  BLOG_POSTS: process.env.NOTION_BLOG_DB_ID!,
}

const PAGES = {
  ARBITRATION_RULES: "256d6063cdf78051b901f47d232dc9be", // existing arbitration rules page
}

// ───────────────────────── Types ─────────────────────────
export interface NotionBlogPost {
  id: string
  slug: string
  title: string
  published: boolean
  publish_date: string
  author: string
  cover_image: string
  excerpt: string
  tags: string[]
  body?: any[] // Body is now optional
}

export interface NotionAdvisor {
  id: string
  slug: string
  title: string
  photo: string
  role: string
  bio: string
  short_bio: string
  order: number
  tags: string[] // Added tags field for advisors to support additional labels like "Investor"
  body?: any[] // Body is now optional
}

export interface NotionNeutral {
  id: string
  slug: string
  title: string
  photo: string
  short_bio: string
  full_bio: string
  tags: string[]
  order: number
  body?: any[] // Body is now optional
}

// ─────────────────────── Helpers ─────────────────────────
function getPlainText(richText: any[]): string {
  return richText?.map((t: any) => t.plain_text).join("") || ""
}

function getFileUrl(file: any): string {
  const f = Array.isArray(file) ? file[0] : file
  if (!f) return ""
  return f.type === "external" ? f.external.url : f.file.url
}

async function getPageContent(pageId: string): Promise<any[]> {
  try {
    const client = getNotionClient()
    const response = await client.blocks.children.list({ block_id: pageId })
    return response.results
  } catch {
    return []
  }
}

async function getPageContentWithChildren(pageId: string): Promise<any[]> {
  try {
    const client = getNotionClient()

    let allBlocks: any[] = []
    let startCursor: string | undefined = undefined
    let hasMore = true

    while (hasMore) {
      const response = await client.blocks.children.list({
        block_id: pageId,
        start_cursor: startCursor,
        page_size: 100,
      })

      allBlocks = allBlocks.concat(response.results)
      hasMore = response.has_more
      startCursor = response.next_cursor || undefined
    }

    // Recursively fetch children for blocks that have them
    for (const block of allBlocks) {
      if (block.has_children) {
        block.children = await getPageContentWithChildren(block.id)
      }
    }

    return allBlocks
  } catch (error: any) {
    console.error("[v0] Failed to fetch page content:", {
      pageId,
      error: error.message,
      code: error.code,
      status: error.status,
    })
    throw error
  }
}

// Helper function to generate slug from name
function generateSlugFromName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim()
}

// ───────────── Cached queries (server side) ──────────────
export const getNeutralsData = cached(
  async function getNeutralsData(): Promise<NotionNeutral[]> {
    try {
      console.log("[v0] Starting to fetch neutrals data...")

      const dataSourceId = await getResolvedDataSourceId(
        DATABASES.NEUTRALS,
        process.env.NEUTRALS_DATA_SOURCE_ID,
        "Neutrals",
      )

      const response = await queryDataSource(dataSourceId)

      console.log(`[v0] Got ${response.results?.length || 0} neutrals from Notion`)

      const neutrals = await Promise.all(
        response.results.map(async (page: any) => {
          const photoUrl =
            getFileUrl(page.properties.photo?.files) || "/placeholder.svg?height=400&width=320&text=No+Image"
          const canonicalPhoto = await getCanonicalImageUrl({
            photo: photoUrl,
            slug: getPlainText(page.properties.slug?.rich_text),
            id: page.id,
            title: getPlainText(page.properties.Name?.title),
          })

          const pageBody = await getPageContent(page.id)

          return {
            id: page.id,
            slug: getPlainText(page.properties.slug?.rich_text),
            title: getPlainText(page.properties.Name?.title),
            photo: canonicalPhoto,
            short_bio: getPlainText(page.properties["short bio"]?.rich_text),
            full_bio: getPlainText(page.properties["full bio"]?.rich_text),
            tags: page.properties.tags?.multi_select?.map((t: any) => t.name) || [],
            order: page.properties.order?.number || 999,
            body: pageBody, // Include body in the list query
          }
        }),
      )

      const sortedNeutrals = neutrals.sort((a, b) => {
        const getLastName = (name: string) => name.split(" ").pop() || name
        return getLastName(a.title).localeCompare(getLastName(b.title))
      })

      console.log(`[v0] Successfully processed ${sortedNeutrals.length} neutrals`)
      return sortedNeutrals
    } catch (error: any) {
      console.error("[v0] Failed to fetch neutrals data:", {
        message: error.message,
        code: error.code,
        status: error.status,
        body: error.body,
      })
      throw error
    }
  },
  ["neutrals:list"],
  { tags: ["neutrals"], revalidate: 3600 },
)

export const getAdvisorsData = cached(
  async function getAdvisorsData(): Promise<NotionAdvisor[]> {
    try {
      const dataSourceId = await getResolvedDataSourceId(
        DATABASES.ADVISORS,
        process.env.LEADERSHIP_DATA_SOURCE_ID,
        "Leadership",
      )

      const response = await queryDataSource(dataSourceId)

      const advisors = await Promise.all(
        response.results.map(async (page: any) => {
          const photoUrl =
            getFileUrl(page.properties.photo?.files) || "/placeholder.svg?height=400&width=320&text=No+Image"
          const canonicalPhoto = await getCanonicalImageUrl({
            photo: photoUrl,
            slug: getPlainText(page.properties.slug?.rich_text),
            id: page.id,
            title: getPlainText(page.properties.Name?.title),
          })

          const pageBody = await getPageContent(page.id)

          return {
            id: page.id,
            slug: getPlainText(page.properties.slug?.rich_text),
            title: getPlainText(page.properties.Name?.title),
            photo: canonicalPhoto,
            role: getPlainText(page.properties.role?.rich_text),
            bio: getPlainText(page.properties.bio?.rich_text),
            short_bio: getPlainText(page.properties["short bio"]?.rich_text),
            order: page.properties.order?.number || 999,
            tags: page.properties.tags?.multi_select?.map((t: any) => t.name) || [], // Added tags field to fetch multi-select tags from Notion
            body: pageBody, // Include body in the list query
          }
        }),
      )

      return advisors.sort((a, b) => {
        const getLastName = (name: string) => name.split(" ").pop() || name
        return getLastName(a.title).localeCompare(getLastName(b.title))
      })
    } catch (error: any) {
      console.error("[v0] Failed to fetch advisors data:", {
        message: error.message,
        code: error.code,
        status: error.status,
        body: error.body,
      })
      throw error
    }
  },
  ["advisors:list"],
  { tags: ["advisors"], revalidate: 3600 },
)

export const getBlogPostsData = cached(
  async function getBlogPostsData(): Promise<NotionBlogPost[]> {
    try {
      const dataSourceId = await getResolvedDataSourceId(DATABASES.BLOG_POSTS, process.env.BLOG_DATA_SOURCE_ID, "Blog")

      const response = await queryDataSource(dataSourceId, {
        filter: { property: "published", checkbox: { equals: true } },
        sorts: [{ property: "publish date", direction: "descending" }],
      })

      return response.results.map((page: any) => ({
        id: page.id,
        slug: getPlainText(page.properties.slug?.rich_text),
        title: getPlainText(page.properties.Name?.title),
        published: page.properties.published?.checkbox || false,
        publish_date: page.properties["publish date"]?.date?.start || "",
        author: getPlainText(page.properties.author?.rich_text),
        cover_image: getFileUrl(page.properties["cover image"]?.files) || "",
        excerpt: getPlainText(page.properties.excerpt?.rich_text),
        tags: page.properties.tags?.multi_select?.map((tag: any) => tag.name) || [],
      }))
    } catch (error: any) {
      console.error("[v0] Failed to fetch blog posts data:", {
        message: error.message,
        code: error.code,
        status: error.status,
      })
      throw error
    }
  },
  ["blog:list"],
  { tags: ["blog"], revalidate: 3600 },
)

export const getBlogPostBySlug = (slug: string) =>
  cached(
    async function getBlogPostBySlug(): Promise<NotionBlogPost | null> {
      try {
        const dataSourceId = await getResolvedDataSourceId(
          DATABASES.BLOG_POSTS,
          process.env.BLOG_DATA_SOURCE_ID,
          "Blog",
        )

        const response = await queryDataSource(dataSourceId, {
          filter: {
            and: [
              { property: "published", checkbox: { equals: true } },
              { property: "slug", rich_text: { equals: slug } },
            ],
          },
        })

        if (response.results.length === 0) return null
        const page = response.results[0] as any
        return {
          id: page.id,
          slug: getPlainText(page.properties.slug?.rich_text),
          title: getPlainText(page.properties.Name?.title),
          published: page.properties.published?.checkbox || false,
          publish_date: page.properties["publish date"]?.date?.start || "",
          author: getPlainText(page.properties.author?.rich_text),
          cover_image: getFileUrl(page.properties["cover image"]?.files) || "",
          excerpt: getPlainText(page.properties.excerpt?.rich_text),
          tags: page.properties.tags?.multi_select?.map((tag: any) => tag.name) || [],
          body: await getPageContent(page.id),
        }
      } catch (error) {
        console.error("[v0] Failed to fetch blog post by slug:", slug, error)
        return null
      }
    },
    ["blog:by-slug", slug],
    { tags: ["blog"], revalidate: 3600 },
  )()

export const getAdvisorBySlug = (slug: string) =>
  cached(
    async function getAdvisorBySlug(): Promise<NotionAdvisor | null> {
      try {
        const dataSourceId = await getResolvedDataSourceId(
          DATABASES.ADVISORS,
          process.env.LEADERSHIP_DATA_SOURCE_ID,
          "Leadership",
        )

        const response = await queryDataSource(dataSourceId, {
          filter: { property: "slug", rich_text: { equals: slug } },
        })

        if (response.results.length === 0) return null
        const page = response.results[0] as any

        const photoUrl =
          getFileUrl(page.properties.photo?.files) || "/placeholder.svg?height=400&width=320&text=No+Image"
        const canonicalPhoto = await getCanonicalImageUrl({
          photo: photoUrl,
          slug: getPlainText(page.properties.slug?.rich_text),
          id: page.id,
          title: getPlainText(page.properties.Name?.title),
        })

        return {
          id: page.id,
          slug: getPlainText(page.properties.slug?.rich_text),
          title: getPlainText(page.properties.Name?.title),
          photo: canonicalPhoto,
          role: getPlainText(page.properties.role?.rich_text),
          bio: getPlainText(page.properties.bio?.rich_text),
          short_bio: getPlainText(page.properties["short bio"]?.rich_text),
          order: page.properties.order?.number || 999,
          tags: page.properties.tags?.multi_select?.map((t: any) => t.name) || [], // Added tags field to fetch multi-select tags from Notion
          body: await getPageContent(page.id),
        }
      } catch (error) {
        console.error("[v0] Failed to fetch advisor by slug:", slug, error)
        return null
      }
    },
    ["advisors:by-slug", slug],
    { tags: ["advisors"], revalidate: 3600 },
  )()

export const getNeutralBySlug = (slug: string) =>
  cached(
    async function getNeutralBySlug(): Promise<NotionNeutral | null> {
      try {
        const dataSourceId = await getResolvedDataSourceId(
          DATABASES.NEUTRALS,
          process.env.NEUTRALS_DATA_SOURCE_ID,
          "Neutrals",
        )

        const response = await queryDataSource(dataSourceId, {
          filter: { property: "slug", rich_text: { equals: slug } },
        })

        if (response.results.length === 0) return null
        const page = response.results[0] as any

        const photoUrl =
          getFileUrl(page.properties.photo?.files) || "/placeholder.svg?height=400&width=320&text=No+Image"
        const canonicalPhoto = await getCanonicalImageUrl({
          photo: photoUrl,
          slug: getPlainText(page.properties.slug?.rich_text),
          id: page.id,
          title: getPlainText(page.properties.Name?.title),
        })

        return {
          id: page.id,
          slug: getPlainText(page.properties.slug?.rich_text),
          title: getPlainText(page.properties.Name?.title),
          photo: canonicalPhoto,
          short_bio: getPlainText(page.properties["short bio"]?.rich_text),
          full_bio: getPlainText(page.properties["full bio"]?.rich_text),
          tags: page.properties.tags?.multi_select?.map((t: any) => t.name) || [],
          order: page.properties.order?.number || 999,
          body: await getPageContent(page.id),
        }
      } catch (error) {
        console.error("[v0] Failed to fetch neutral by slug:", slug, error)
        return null
      }
    },
    ["neutrals:by-slug", slug],
    { tags: ["neutrals"], revalidate: 3600 },
  )()

export const getRulesPageContent = cached(
  async function getRulesPageContent(): Promise<any[]> {
    try {
      const blocks = await getPageContentWithChildren(PAGES.ARBITRATION_RULES)
      return blocks
    } catch (error: any) {
      console.error("[v0] Failed to fetch rules content:", error.message)
      throw error
    }
  },
  ["rules:content"],
  { tags: ["rules"], revalidate: 86400 },
)

export const getOmbudsBySlug = (slug: string) =>
  cached(
    async function getOmbudsBySlug(): Promise<NotionNeutral | null> {
      try {
        const dataSourceId = await getResolvedDataSourceId(
          DATABASES.NEUTRALS, // Ombuds use same database structure as neutrals
          process.env.OMBUDS_DATA_SOURCE_ID,
          "Ombuds",
        )

        const response = await queryDataSource(dataSourceId, {
          filter: { property: "slug", rich_text: { equals: slug } },
        })

        if (response.results.length === 0) return null
        const page = response.results[0] as any

        const photoUrl =
          getFileUrl(page.properties.photo?.files) || "/placeholder.svg?height=400&width=320&text=No+Image"
        const canonicalPhoto = await getCanonicalImageUrl({
          photo: photoUrl,
          slug: getPlainText(page.properties.slug?.rich_text),
          id: page.id,
          title: getPlainText(page.properties.Name?.title),
        })

        return {
          id: page.id,
          slug: getPlainText(page.properties.slug?.rich_text),
          title: getPlainText(page.properties.Name?.title),
          photo: canonicalPhoto,
          short_bio: "", // Not using properties since they're empty
          full_bio: "", // Not using properties since they're empty
          tags: ["Ombud"], // Force "Ombud" tag instead of using Notion tags
          order: page.properties.order?.number || 999,
          body: await getPageContent(page.id),
        }
      } catch (error) {
        console.error("[v0] Failed to fetch ombud by slug:", slug, error)
        return null
      }
    },
    ["ombuds:by-slug", slug],
    { tags: ["ombuds"], revalidate: 3600 },
  )()

export const getOmbudsData = cached(
  async function getOmbudsData(): Promise<NotionNeutral[]> {
    try {
      console.log("[v0] Starting to fetch ombuds data...")

      const dataSourceId = await getResolvedDataSourceId(
        DATABASES.NEUTRALS, // Assuming ombuds use the same database structure as neutrals
        process.env.OMBUDS_DATA_SOURCE_ID,
        "Ombuds",
      )

      const response = await queryDataSource(dataSourceId)

      console.log(`[v0] Got ${response.results?.length || 0} ombuds from Notion`)

      const ombuds = await Promise.all(
        response.results.map(async (page: any) => {
          const originalSlug = getPlainText(page.properties.slug?.rich_text)
          const name = getPlainText(page.properties.Name?.title)

          const finalSlug = originalSlug || generateSlugFromName(name)

          console.log("[v0] Processing ombud page:", {
            id: page.id,
            properties: Object.keys(page.properties || {}),
            originalSlug,
            finalSlug,
            name,
          })

          const photoUrl =
            getFileUrl(page.properties.photo?.files) || "/placeholder.svg?height=400&width=320&text=No+Image"
          const canonicalPhoto = await getCanonicalImageUrl({
            photo: photoUrl,
            slug: finalSlug, // Use generated slug for image processing
            id: page.id,
            title: name,
          })

          const pageBody = await getPageContent(page.id)

          return {
            id: page.id,
            slug: finalSlug, // Use generated slug instead of original
            title: name,
            photo: canonicalPhoto,
            short_bio: "", // Not using properties since they're empty
            full_bio: "", // Not using properties since they're empty
            tags: ["Ombud"], // Force "Ombud" tag instead of using Notion tags
            order: page.properties.order?.number || 999,
            body: pageBody,
          }
        }),
      )

      const sortedOmbuds = ombuds.sort((a, b) => {
        const getLastName = (name: string) => name.split(" ").pop() || name
        return getLastName(a.title).localeCompare(getLastName(b.title))
      })

      console.log(
        "[v0] Final processed ombuds:",
        sortedOmbuds.map((o) => ({ title: o.title, slug: o.slug, hasBody: !!o.body?.length })),
      )

      console.log(`[v0] Successfully processed ${sortedOmbuds.length} ombuds`)
      return sortedOmbuds
    } catch (error: any) {
      console.error("[v0] Failed to fetch ombuds data:", {
        message: error.message,
        code: error.code,
        status: error.status,
        body: error.body,
      })
      throw error
    }
  },
  ["ombuds:list"],
  { tags: ["ombuds"], revalidate: 3600 },
)

export const getNeutrals = getNeutralsData

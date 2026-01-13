import { put, head } from "@vercel/blob"
import { AbortSignal } from "abort-controller"

export interface ImageIngestionResult {
  success: boolean
  canonicalUrl?: string
  error?: string
}

export async function ingestImage(
  notionUrl: string,
  personId: string,
  forceRefresh = false,
): Promise<ImageIngestionResult> {
  try {
    const isJoshGordon = personId.toLowerCase().includes("josh") || personId.toLowerCase().includes("gordon")
    if (isJoshGordon) {
      console.log("[v0] Processing Josh Gordon image:", { notionUrl, personId, forceRefresh })
    }

    // Skip if already a canonical URL
    if (notionUrl.includes("blob.vercel-storage.com")) {
      if (isJoshGordon) console.log("[v0] Josh Gordon: Already has blob URL")
      return { success: true, canonicalUrl: notionUrl }
    }

    // Skip if it's a placeholder URL
    if (notionUrl.includes("placeholder.svg")) {
      if (isJoshGordon) console.log("[v0] Josh Gordon: Has placeholder URL")
      return { success: true, canonicalUrl: notionUrl }
    }

    // Generate stable blob key
    const slug = personId.toLowerCase().replace(/[^a-z0-9-]/g, "-")
    if (isJoshGordon) console.log("[v0] Josh Gordon slug:", slug)

    const urlExtension = notionUrl.match(/\.(png|jpg|jpeg|webp|gif)/i)?.[1]?.toLowerCase()
    const possibleExtensions = urlExtension ? [urlExtension] : ["jpg", "png", "webp"]

    if (!forceRefresh) {
      for (const ext of possibleExtensions) {
        try {
          const existingBlob = await head(`people/${slug}.${ext}`)
          if (existingBlob?.url) {
            if (isJoshGordon) console.log("[v0] Josh Gordon: Found existing blob:", existingBlob.url)
            return { success: true, canonicalUrl: existingBlob.url }
          }
        } catch (error: any) {
          // Continue to next extension if 404
          if (error.statusCode !== 404) {
            console.error(`Error checking blob existence for ${personId}.${ext}:`, error.message)
          }
        }
      }
      if (isJoshGordon) console.log("[v0] Josh Gordon: Blob doesn't exist, will upload")
    }

    let response: Response | undefined
    let retries = 2

    while (retries > 0) {
      try {
        if (isJoshGordon) console.log("[v0] Josh Gordon: Fetching from Notion...")
        response = await fetch(notionUrl, {
          headers: {
            "User-Agent": "FAIR-Sports-Bot/1.0",
          },
          signal: AbortSignal.timeout(10000),
        })

        if (response.ok) {
          if (isJoshGordon) console.log("[v0] Josh Gordon: Notion fetch successful")
          break
        }

        console.error(`Notion fetch failed for ${personId}: ${response.status} ${response.statusText}`)

        if (response.status === 403 || response.status >= 500) {
          retries--
          if (retries > 0) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            continue
          }
        }

        return { success: false, error: `Failed to fetch image: ${response.status}` }
      } catch (error) {
        retries--
        console.error(`Network error fetching ${personId}:`, error)
        if (retries === 0) {
          return { success: false, error: `Network error: ${error instanceof Error ? error.message : "Unknown error"}` }
        }
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }

    if (!response) {
      return { success: false, error: "Failed to fetch image after retries" }
    }

    const contentType = response.headers.get("content-type") || "image/jpeg"

    // Validate it's actually an image
    if (!contentType.startsWith("image/")) {
      console.error(`Invalid content type for ${personId}: ${contentType}`)
      return { success: false, error: `Invalid content type: ${contentType}` }
    }

    const extension = contentType.includes("png") ? "png" : contentType.includes("webp") ? "webp" : "jpg"
    const filename = `people/${slug}.${extension}`

    const imageBuffer = await response.arrayBuffer()
    if (isJoshGordon) console.log("[v0] Josh Gordon: Uploading to blob storage:", filename)

    try {
      const blob = await put(filename, imageBuffer, {
        access: "public",
        contentType,
        cacheControl: "public, max-age=31536000, immutable",
        allowOverwrite: true,
      })

      if (isJoshGordon) console.log("[v0] Josh Gordon: Upload successful:", blob.url)
      return { success: true, canonicalUrl: blob.url }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      console.error(`Blob upload failed for ${filename}:`, errorMessage)
      return { success: false, error: errorMessage }
    }
  } catch (error) {
    console.error(`Image ingestion failed for ${personId}:`, error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function getCanonicalImageUrl(person: any, forceRefresh = false): Promise<string> {
  const isJoshGordon = person.title?.toLowerCase().includes("josh") && person.title?.toLowerCase().includes("gordon")
  if (isJoshGordon) {
    console.log("[v0] getCanonicalImageUrl for Josh Gordon:", {
      photo: person.photo,
      slug: person.slug,
      title: person.title,
    })
  }

  if (!person.photo) {
    if (isJoshGordon) console.log("[v0] Josh Gordon: No photo field found")
    return "/placeholder.svg?height=320&width=320&text=No+Image"
  }

  // If already canonical, return as-is unless forcing refresh
  if (!forceRefresh && (person.photo.includes("blob.vercel-storage.com") || person.photo.startsWith("/"))) {
    if (isJoshGordon) console.log("[v0] Josh Gordon: Returning existing photo URL")
    return person.photo
  }

  // Try to ingest the image
  const personId = person.slug || person.id || person.title.replace(/\s+/g, "-").toLowerCase()

  const result = await ingestImage(person.photo, personId, forceRefresh)

  if (result.success && result.canonicalUrl) {
    if (isJoshGordon) console.log("[v0] Josh Gordon: Final canonical URL:", result.canonicalUrl)
    return result.canonicalUrl
  }

  console.error(`Failed to get canonical image for ${personId}: ${result.error}`)
  return "/placeholder.svg?height=320&width=320&text=Photo+Unavailable"
}

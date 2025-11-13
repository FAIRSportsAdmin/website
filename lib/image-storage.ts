import { put, head } from "@vercel/blob"

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
    // Skip if already a canonical URL
    if (notionUrl.includes("blob.vercel-storage.com")) {
      return { success: true, canonicalUrl: notionUrl }
    }

    // Skip if it's a placeholder URL
    if (notionUrl.includes("placeholder.svg")) {
      return { success: true, canonicalUrl: notionUrl }
    }

    // Generate stable blob key
    const slug = personId.toLowerCase().replace(/[^a-z0-9-]/g, "-")

    let response: Response
    let retries = 2

    while (retries > 0) {
      try {
        response = await fetch(notionUrl, {
          headers: {
            "User-Agent": "FAIR-Sports-Bot/1.0",
          },
          signal: AbortSignal.timeout(10000), // 10 second timeout
        })

        if (response.ok) break

        if (response.status === 403 || response.status >= 500) {
          retries--
          if (retries > 0) {
            await new Promise((resolve) => setTimeout(resolve, 1000)) // 1 second delay
            continue
          }
        }

        return { success: false, error: `Failed to fetch image: ${response.status}` }
      } catch (error) {
        retries--
        if (retries === 0) {
          return { success: false, error: `Network error: ${error instanceof Error ? error.message : "Unknown error"}` }
        }
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }

    const contentType = response!.headers.get("content-type") || "image/jpeg"

    // Validate it's actually an image
    if (!contentType.startsWith("image/")) {
      return { success: false, error: `Invalid content type: ${contentType}` }
    }

    const extension = contentType.includes("png") ? "png" : contentType.includes("webp") ? "webp" : "jpg"
    const filename = `people/${slug}.${extension}`

    if (!forceRefresh) {
      try {
        const existingBlob = await head(filename)
        if (existingBlob) {
          return { success: true, canonicalUrl: existingBlob.url }
        }
      } catch (error) {
        // No existing blob found, will create new one
      }
    }

    const imageBuffer = await response!.arrayBuffer()

    try {
      const blob = await put(filename, imageBuffer, {
        access: "public",
        contentType,
        cacheControl: "public, max-age=31536000, immutable",
        addRandomSuffix: true, // Always add random suffix to avoid conflicts
      })

      return { success: true, canonicalUrl: blob.url }
    } catch (error) {
      // Handle Vercel Blob API errors, including JSON parsing issues
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      console.error(`Blob upload failed for ${filename}:`, errorMessage)

      // If it's a JSON parsing error or rate limit, fall back to placeholder
      return { success: false, error: errorMessage }
    }
  } catch (error) {
    console.error("Image ingestion failed:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function getCanonicalImageUrl(person: any, forceRefresh = false): Promise<string> {
  if (!person.photo) {
    return "/placeholder.svg?height=320&width=320&text=No+Image"
  }

  // If already canonical, return as-is unless forcing refresh
  if (!forceRefresh && (person.photo.includes("blob.vercel-storage.com") || person.photo.startsWith("/"))) {
    return person.photo
  }

  // Try to ingest the image
  const personId = person.slug || person.id || person.title.replace(/\s+/g, "-").toLowerCase()

  const result = await ingestImage(person.photo, personId, forceRefresh)

  if (result.success && result.canonicalUrl) {
    return result.canonicalUrl
  }

  return "/placeholder.svg?height=320&width=320&text=Photo+Unavailable"
}

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

    if (!forceRefresh) {
      try {
        const existingBlob = await head(`people/${slug}.jpg`)
        if (existingBlob?.url) {
          return { success: true, canonicalUrl: existingBlob.url }
        }
      } catch (error: any) {
        // 404 means blob doesn't exist, which is expected for new entries
        if (error.statusCode !== 404) {
          console.error(`Error checking blob existence for ${personId}:`, error.message)
        }
      }
    }

    let response: Response | undefined
    let retries = 2

    while (retries > 0) {
      try {
        response = await fetch(notionUrl, {
          headers: {
            "User-Agent": "FAIR-Sports-Bot/1.0",
          },
          signal: AbortSignal.timeout(10000),
        })

        if (response.ok) {
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

    try {
      const blob = await put(filename, imageBuffer, {
        access: "public",
        contentType,
        cacheControl: "public, max-age=31536000, immutable",
      })

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

  console.error(`Failed to get canonical image for ${personId}: ${result.error}`)
  return "/placeholder.svg?height=320&width=320&text=Photo+Unavailable"
}

import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const imageUrl = searchParams.get("url")

  if (!imageUrl) {
    return new NextResponse("Missing url parameter", { status: 400 })
  }

  // Validate that the URL is from allowed Notion domains
  const allowedHosts = [
    "secure.notion-static.com",
    "prod-files-secure.s3.us-west-2.amazonaws.com",
    "s3.us-west-2.amazonaws.com",
  ]

  try {
    const url = new URL(imageUrl)
    if (!allowedHosts.includes(url.hostname)) {
      return new NextResponse("Invalid image host", { status: 403 })
    }
  } catch {
    return new NextResponse("Invalid URL", { status: 400 })
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

    const response = await fetch(imageUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "FAIR Sports Image Proxy/1.0",
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return new NextResponse("Image not found", { status: 404 })
    }

    const contentType = response.headers.get("content-type")
    if (!contentType?.startsWith("image/")) {
      return new NextResponse("Not an image", { status: 400 })
    }

    const imageBuffer = await response.arrayBuffer()

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
        "CDN-Cache-Control": "public, max-age=86400",
        "Vercel-CDN-Cache-Control": "public, max-age=86400",
      },
    })
  } catch (error) {
    console.error("Image proxy error:", error)
    return new NextResponse("Failed to fetch image", { status: 500 })
  }
}

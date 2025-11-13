import { type NextRequest, NextResponse } from "next/server"
import { ingestImage } from "@/lib/image-storage"

export async function POST(request: NextRequest) {
  try {
    const { notionUrl, personId } = await request.json()

    if (!notionUrl || !personId) {
      return NextResponse.json({ error: "Missing notionUrl or personId" }, { status: 400 })
    }

    const result = await ingestImage(notionUrl, personId)

    if (result.success) {
      return NextResponse.json({
        success: true,
        canonicalUrl: result.canonicalUrl,
      })
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Image ingestion API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { tag, secret } = await req.json()

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  if (!tag) {
    return NextResponse.json({ message: "Tag is required" }, { status: 400 })
  }

  try {
    revalidateTag(tag)
    return NextResponse.json({ revalidated: true, tag, now: Date.now() })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ revalidated: false, tag, message }, { status: 500 })
  }
}

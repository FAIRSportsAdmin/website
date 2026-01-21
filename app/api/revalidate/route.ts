import { revalidateTag, revalidatePath } from "next/cache"
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

// GET endpoint to revalidate all people data (neutrals, advisors, ombuds)
// Usage: /api/revalidate?secret=YOUR_SECRET&all=true
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get("secret")
  const all = searchParams.get("all")

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const tags = ["neutrals", "advisors", "ombuds", "blog"]
    const paths = ["/neutrals", "/advisors-and-leadership", "/ombuds-staff", "/blog"]
    
    // Revalidate all data tags
    for (const tag of tags) {
      revalidateTag(tag)
    }
    
    // Also revalidate the actual page paths to clear Full Route Cache
    for (const path of paths) {
      revalidatePath(path)
    }

    return NextResponse.json({ 
      revalidated: true, 
      tags, 
      paths,
      now: Date.now() 
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ revalidated: false, message }, { status: 500 })
  }
}

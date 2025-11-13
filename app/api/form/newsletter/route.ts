import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Basic validation
    if (!email || !email.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Get HubSpot tracking cookie
    const hubspotutk = request.cookies.get("hubspotutk")?.value

    // Prepare HubSpot submission
    const hubspotData = {
      fields: [{ name: "email", value: email }],
      context: {
        hutk: hubspotutk,
        pageUri: request.headers.get("origin") || "",
        pageName: "Newsletter Signup",
      },
    }

    // Submit to HubSpot
    const hubspotResponse = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/50161433/4519d718-9e5b-48fa-8e4d-a999b979a8a6`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hubspotData),
      },
    )

    if (!hubspotResponse.ok) {
      const errorText = await hubspotResponse.text()
      console.error("HubSpot submission failed:", errorText)
      return NextResponse.json({ error: "Failed to submit newsletter signup" }, { status: 500 })
    }

    const hubspotResult = await hubspotResponse.json()

    return NextResponse.json({
      ok: true,
      hubspot: hubspotResult,
    })
  } catch (error) {
    console.error("Error processing newsletter signup:", error)
    return NextResponse.json({ error: "Failed to submit newsletter signup" }, { status: 500 })
  }
}

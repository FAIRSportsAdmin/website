import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstname, lastname, email, message } = body

    // Basic validation
    if (!email || !email.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    if (!message || message.length > 5000) {
      return NextResponse.json({ error: "Message is required and must be under 5000 characters" }, { status: 400 })
    }

    // Get HubSpot tracking cookie
    const hubspotutk = request.cookies.get("hubspotutk")?.value

    // Prepare HubSpot submission
    const hubspotData = {
      fields: [
        { name: "firstname", value: firstname || "" },
        { name: "lastname", value: lastname || "" },
        { name: "email", value: email },
        { name: "message", value: message },
      ],
      context: {
        hutk: hubspotutk,
        pageUri: request.headers.get("origin") || "",
        pageName: "Confidential Inquiry Form",
      },
    }

    // Submit to HubSpot
    const hubspotResponse = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/50161433/85724804-1033-434a-960a-9bcbb1aceb4c`,
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
      return NextResponse.json({ error: "Failed to submit form" }, { status: 500 })
    }

    const hubspotResult = await hubspotResponse.json()

    return NextResponse.json({
      ok: true,
      hubspot: hubspotResult,
    })
  } catch (error) {
    console.error("Error processing ombuds form:", error)
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 })
  }
}

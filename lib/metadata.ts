import type { Metadata } from "next"

// Fallback to current domain if NEXT_PUBLIC_BASE_URL isn't set
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL
  }

  // In production, try to infer from Vercel
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // Development fallback
  return "http://localhost:3000"
}

const baseUrl = getBaseUrl()

interface PageMetadata {
  title?: string
  description?: string
  path?: string
  image?: string
  icons?: {
    icon?: string
    shortcut?: string
    apple?: string
  }
}

export function createMetadata({
  title,
  description = "Fast and fair dispute resolution for college sports. Professional arbitration services that protect athletes, institutions, and the integrity of collegiate athletics.",
  path = "",
  image,
  icons = { icon: "/assets/fairsports-favicon.png" },
}: PageMetadata = {}): Metadata {
  const fullTitle = title
    ? `${title} | FAIR Sports - Forum of Arbitration & Independent Resolution`
    : "FAIR Sports - Forum of Arbitration & Independent Resolution"

  const url = `${baseUrl}${path}`

  // Ensure image URL is absolute
  let ogImage = `${baseUrl}/assets/fairsports-meta.png`
  if (image) {
    // If image is already absolute URL, use it; otherwise make it absolute
    ogImage = image.startsWith("http") ? image : `${baseUrl}${image.startsWith("/") ? image : `/${image}`}`
  }

  return {
    title: fullTitle,
    description,
    icons,
    keywords: [
      "college sports",
      "arbitration",
      "mediation",
      "dispute resolution",
      "NCAA",
      "athletics",
      "sports law",
      "FAIR Sports",
    ],
    authors: [{ name: "FAIR Sports" }],
    creator: "FAIR Sports",
    publisher: "FAIR Sports",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: fullTitle,
      description,
      siteName: "FAIR Sports",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "FAIR Sports - Forum of Arbitration & Independent Resolution",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: "@fairsports",
      site: "@fairsports",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code", // Add your actual verification code
    },
  }
}

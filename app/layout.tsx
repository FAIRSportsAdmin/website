import type React from "react"
import { Inter, Archivo } from "next/font/google"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"
import { NavigationFinal } from "@/components/navigation-final"
import { Footer } from "@/components/footer"
import { createMetadata } from "@/lib/metadata"
import "./globals.css"
import Script from "next/script"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Correctly load Archivo as a variable font by not specifying static weights.
const fontHeading = Archivo({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

export const metadata = createMetadata({
  icons: {
    icon: "/assets/fairsports-favicon.png",
  },
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overflow-x-hidden",
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <Script id="version-log" strategy="afterInteractive">
          {`console.log("%c🚀 FAIR Sports - Latest Version from v0 Chat", "background: #0066ff; color: white; padding: 8px 16px; font-size: 14px; font-weight: bold; border-radius: 4px;");
          console.log("%cNav Hover Fix + Advisor Preview Text Added", "color: #0066ff; font-size: 12px;");`}
        </Script>

        <Script id="hs-script-loader" src="https://js.hs-scripts.com/50161433.js" strategy="afterInteractive" />

        <NavigationFinal />
        <main>{children}</main>
        <Footer />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

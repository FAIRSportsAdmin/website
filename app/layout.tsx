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
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable, fontHeading.variable)}>
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

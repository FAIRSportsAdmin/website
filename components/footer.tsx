"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/form/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit newsletter signup")
      }

      setIsSubmitted(true)
      setEmail("")

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    } catch (error) {
      console.error("Error submitting newsletter signup:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-ink-texture text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Newsletter Column */}
          <div>
            <h3 className="font-bold mb-4">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">Stay updated about FAIR Sports</p>
            <div className="max-w-sm">
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting || isSubmitted}
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:border-fair-blue focus:outline-none text-sm disabled:opacity-50"
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full bg-[#63CBFD] hover:bg-[#4FB8EA] text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#63CBFD] focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50"
                >
                  {isSubmitting ? "Subscribing..." : isSubmitted ? "Subscribed!" : "Subscribe"}
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:text-white"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mb-8">
          <img src="/assets/footer-logo.png" alt="FAIR Sports" className="h-20 w-auto mx-auto mb-4" />
          <p className="text-gray-300 max-w-md mx-auto">Forum of Arbitration & Independent Resolution</p>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
          <p className="text-sm">&copy; {new Date().getFullYear()} FAIR Sports LLC. All rights reserved.</p>
          <div className="mt-2 text-sm">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms and Conditions
            </Link>
            <span className="mx-2">•</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="mx-2">•</span>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <span className="mx-2">•</span>
            <Link href="/disclaimer" className="hover:text-white transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

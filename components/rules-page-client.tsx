"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"
import TableOfContents from "@/components/table-of-contents"

interface RulesPageClientProps {
  rulesContent: string
}

export default function RulesPageClient({ rulesContent }: RulesPageClientProps) {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState("")
  const contentRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "fairsports25") {
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Incorrect password")
      setPassword("")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-navy/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-navy" />
            </div>
            <CardTitle className="text-2xl font-bold">Protected Content</CardTitle>
            <CardDescription>
              This page contains confidential FAIR rules and procedures. Please enter the password to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
                {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
              </div>
              <Button type="submit" className="w-full">
                Access Rules
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 pb-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-navy mb-4">FAIR Rules and Procedures</h1>
          <p className="text-lg text-gray-600">Forum of Arbitration and Independent Resolution in Sports</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-navy mb-4">Table of Contents</h2>
              <TableOfContents contentRef={contentRef} />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <div
                ref={contentRef}
                className="rules-content not-prose prose-lg max-w-none prose-headings:text-navy prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:underline prose-ul:text-gray-700 prose-li:text-gray-700 prose-ol:text-gray-700"
                dangerouslySetInnerHTML={{ __html: rulesContent }}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <TableOfContents contentRef={contentRef} />
          </div>
        </div>
      </div>
    </div>
  )
}

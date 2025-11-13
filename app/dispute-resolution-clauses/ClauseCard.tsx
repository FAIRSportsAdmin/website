"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface ClauseCardProps {
  title: string
  content: string
}

export function ClauseCard({ title, content }: ClauseCardProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Card className="bg-white shadow-lg border-0 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between bg-gray-50/70 p-6 border-b">
        <CardTitle className="text-xl font-bold text-navy">{title}</CardTitle>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="text-navy hover:bg-sky/10 hover:text-accord">
          {isCopied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-green-600" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Clause
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{content}</pre>
      </CardContent>
    </Card>
  )
}

"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { ChevronRight } from "lucide-react"

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLDivElement>
}

export default function TableOfContents({ contentRef }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    if (!contentRef.current) return

    console.log("[v0] TOC: Content ref found, searching for headings...")

    const headings = contentRef.current.querySelectorAll("h1, h2, h3, h4, h5, h6")
    console.log("[v0] TOC: Found headings:", headings.length)

    const items: TOCItem[] = []

    headings.forEach((heading, index) => {
      const text = heading.textContent || ""
      let id = heading.id

      console.log("[v0] TOC: Processing heading:", text, "ID:", id)

      if (!id && text.match(/Rule\s+\d+/i)) {
        id = `rule-${text.match(/\d+/)?.[0] || index}`
        heading.id = id
        console.log("[v0] TOC: Generated ID:", id)
      } else if (!id && text.match(/M-\d+/i)) {
        id = `mediation-rule-${text.match(/\d+/)?.[0] || index}`
        heading.id = id
        console.log("[v0] TOC: Generated mediation ID:", id)
      } else if (!id && text.match(/ARBITRATION RULES AND PROCEDURES/i)) {
        id = "arbitration-rules"
        heading.id = id
        console.log("[v0] TOC: Generated arbitration section ID:", id)
      } else if (!id && text.match(/MEDIATION RULES AND PROCEDURES/i)) {
        id = "mediation-rules"
        heading.id = id
        console.log("[v0] TOC: Generated mediation section ID:", id)
      }

      if (
        (text.match(/Rule\s+\d+/i) ||
          text.match(/M-\d+/i) ||
          text.match(/ARBITRATION RULES AND PROCEDURES/i) ||
          text.match(/MEDIATION RULES AND PROCEDURES/i)) &&
        id
      ) {
        items.push({ id, text, level: Number.parseInt(heading.tagName.charAt(1)) })
        console.log("[v0] TOC: Added to TOC:", text)
      }
    })

    console.log("[v0] TOC: Final items:", items)
    setTocItems(items)
  }, [contentRef])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0% -35% 0%" },
    )

    tocItems.forEach(({ id }) => {
      if (typeof document === "undefined") return
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [tocItems])

  const scrollToHeading = (id: string) => {
    if (typeof document === "undefined" || typeof window === "undefined") return

    const element = document.getElementById(id)
    if (element) {
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - 120 // 120px offset for fixed header plus padding
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  if (tocItems.length === 0) return null

  return (
    <div className="sticky top-24 bg-gray-50 rounded-xl p-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h3 className="text-lg font-bold text-navy mb-4 flex items-center">
        <ChevronRight className="w-5 h-5 mr-2" />
        Contents
      </h3>
      <nav className="space-y-2">
        {tocItems.map(({ id, text, level }) => (
          <button
            key={id}
            onClick={() => scrollToHeading(id)}
            className={`
              block w-full text-left text-sm transition-colors duration-200 hover:text-blue-600 font-medium
              ${activeId === id ? "text-blue-600 font-semibold" : "text-gray-700"}
            `}
          >
            {text}
          </button>
        ))}
      </nav>
    </div>
  )
}

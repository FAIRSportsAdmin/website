"use client"

import { PersonCard } from "./person-card"
import { PersonGridSkeleton } from "./loading-states"
import type { NotionAdvisor, NotionNeutral, NotionOmbud } from "@/lib/notion-data"

type PersonWithHTML = (NotionAdvisor | NotionNeutral | NotionOmbud) & { bodyHTML?: string }

interface PersonGridProps {
  items: PersonWithHTML[]
  type: "advisor" | "neutral" | "ombud"
  loading?: boolean
}

export function PersonGrid({ items, type, loading = false }: PersonGridProps) {
  if (loading) {
    return <PersonGridSkeleton />
  }

  if (items.length === 0) {
    const typeName = type === "advisor" ? "advisors" : type === "neutral" ? "neutrals" : "ombuds"
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-2xl shadow-lg p-12">
          <p className="text-gray-500 text-lg mb-4">No {typeName} found.</p>
          <p className="text-gray-400">Please check back soon for updates.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-wrap justify-center gap-6 max-w-6xl">
        {items.map((item) => (
          <PersonCard key={item.id} person={item} type={type} bodyHTML={item.bodyHTML} />
        ))}
      </div>
    </div>
  )
}

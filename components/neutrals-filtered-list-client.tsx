"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { PersonGrid } from "@/components/common/person-grid"
import type { NotionNeutral } from "@/lib/notion-data"

type PersonWithHTML = NotionNeutral & { bodyHTML?: string }

const FILTER_OPTIONS = ["Arbitrator", "Mediator"]

interface Props {
  neutrals: PersonWithHTML[]
}

export default function NeutralsFilteredListClient({ neutrals }: Props) {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(selectedFilter === filter ? null : filter)
  }

  const getFilteredPeople = () => {
    if (!selectedFilter) {
      return neutrals
    }
    return neutrals.filter((person) => person.tags && person.tags.includes(selectedFilter))
  }

  const filteredPeople = getFilteredPeople()

  return (
    <>
      {/* Filter chips */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-navy mr-2">Filter by role:</span>
          {FILTER_OPTIONS.map((filter) => (
            <Badge
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              className={`cursor-pointer transition-colors ${
                selectedFilter === filter
                  ? "bg-[#63CBFD] text-white hover:bg-[#4FB8EA]"
                  : "hover:bg-sky/10 border-sky text-navy"
              }`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      {/* People grid */}
      <PersonGrid items={filteredPeople} type="neutral" loading={false} />
    </>
  )
}

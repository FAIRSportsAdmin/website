"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { PersonGrid } from "@/components/common/person-grid"
import { PersonGridSkeleton } from "@/components/common/loading-states"
import type { NotionNeutral } from "@/lib/notion-data"

type PersonWithHTML = NotionNeutral & { bodyHTML?: string }

const FILTER_OPTIONS = ["Arbitrator", "Mediator"]

export default function NeutralsFilteredList() {
  const [neutrals, setNeutrals] = useState<PersonWithHTML[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("[v0] Starting to fetch neutrals data...")

        // Fetch neutrals data
        const neutralsResponse = await fetch("/api/neutrals")
        console.log("[v0] Neutrals response status:", neutralsResponse.status)

        if (!neutralsResponse.ok) {
          throw new Error(`Neutrals API failed with status ${neutralsResponse.status}`)
        }

        const neutralsData = await neutralsResponse.json()
        console.log("[v0] Neutrals data received:", neutralsData.length, "items")

        setNeutrals(neutralsData)
        setError(null)
      } catch (error) {
        console.error("[v0] Failed to fetch people data:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(selectedFilter === filter ? null : filter)
  }

  const getFilteredPeople = () => {
    if (!selectedFilter) {
      return neutrals
    }

    // Filter neutrals by their tags
    return neutrals.filter((person) => person.tags && person.tags.includes(selectedFilter))
  }

  const filteredPeople = getFilteredPeople()

  if (loading) {
    return (
      <>
        {/* Filter chips skeleton */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-navy mr-2">Filter by role:</span>
            {FILTER_OPTIONS.map((filter) => (
              <div key={filter} className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
        <PersonGridSkeleton count={8} />
      </>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-2">Error loading data: {error}</p>
        <button onClick={() => window.location.reload()} className="text-blue-600 hover:underline">
          Try again
        </button>
      </div>
    )
  }

  if (filteredPeople.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-2">No neutrals found.</p>
        <p className="text-sm text-gray-500">
          Debug: Neutrals: {neutrals.length}, Filter: {selectedFilter || "none"}
        </p>
        <p className="text-sm text-gray-400 mt-2">Please check back soon for updates.</p>
      </div>
    )
  }

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

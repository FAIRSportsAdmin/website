"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ContentModal } from "./content-modal"
import type { NotionAdvisor, NotionNeutral } from "@/lib/notion-data"

type PersonType = "advisor" | "neutral" | "ombud"

interface PersonCardProps {
  person: NotionAdvisor | NotionNeutral
  type: PersonType
  bodyHTML?: string
  index?: number
}

export function PersonCard({ person, type, bodyHTML, index = 0 }: PersonCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const isNeutral = type === "neutral"
  const isOmbud = type === "ombud"
  const tags = isNeutral || isOmbud ? (person as NotionNeutral).tags : []
  const role = !isNeutral && !isOmbud ? (person as NotionAdvisor).role : undefined

  const getImageSrc = () => {
    if (person.photo && person.photo.includes("blob.vercel-storage.com")) {
      return person.photo
    }
    if (person.photo && person.photo.trim()) {
      return person.photo
    }
    return null
  }

  const imageSrc = getImageSrc()

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const getPreviewText = () => {
    if (bodyHTML) {
      if (typeof document === "undefined") return ""

      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = bodyHTML
      const plainText = tempDiv.textContent || tempDiv.innerText || ""
      const sentences = plainText.split(/[.!?]+/).filter((s) => s.trim().length > 0)
      const preview = sentences.slice(0, 2).join(". ") + (sentences.length > 2 ? "." : "")
      return preview.length > 120 ? preview.substring(0, 120) + "..." : preview
    }
    return ""
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -3, scale: 1.005 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        className="cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative rounded-2xl bg-gradient-to-br from-white to-gray-50/30 shadow-lg hover:shadow-2xl transition-shadow duration-100 overflow-hidden border border-white/50 backdrop-blur-sm w-80 h-[480px] flex flex-col">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accord via-sky to-navy opacity-60 group-hover:opacity-100 transition-opacity duration-100" />

          <div className="h-80 relative bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden flex-shrink-0">
            {imageSrc && !imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-50 animate-pulse" />
            )}

            {(!imageSrc || imageError) && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full mx-auto mb-3 shadow-inner"></div>
                  <p className="text-xs font-medium tracking-wide">Photo Unavailable</p>
                </div>
              </div>
            )}

            {imageSrc && (
              <img
                src={imageSrc || "/placeholder.svg"}
                alt={person.title}
                className={`absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-100 ease-out ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading={index < 6 ? "eager" : "lazy"}
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
          </div>

          <div className="relative p-4 bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-sm flex-1 flex flex-col min-h-0">
            <h3 className="text-xl font-black text-ink leading-tight mb-2 tracking-tight group-hover:text-navy transition-colors duration-100">
              {person.title}
            </h3>

            {role && (
              <div className="flex items-center mb-2">
                <div className="w-1 h-4 bg-gradient-to-b from-accord to-sky rounded-full mr-3 opacity-70"></div>
                <p className="text-sm font-semibold text-accord tracking-wide uppercase">{role}</p>
              </div>
            )}

            {getPreviewText() && (
              <div className="mb-3 flex-shrink-0">
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 font-medium">{getPreviewText()}</p>
              </div>
            )}

            <div className="flex-1 flex flex-col justify-end min-h-0">
              {tags && tags.length > 0 && !isOmbud && (
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 2).map((tag, index) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className={`
                        text-xs font-medium border-0 px-3 py-1.5 rounded-full shadow-sm
                        ${
                          index === 0
                            ? "bg-gradient-to-r from-sky/20 to-accord/20 text-navy"
                            : "bg-gradient-to-r from-navy/10 to-ink/10 text-navy"
                        }
                        hover:shadow-md transition-shadow duration-100
                      `}
                    >
                      {tag}
                    </Badge>
                  ))}
                  {tags.length > 2 && (
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-500 text-xs font-medium border border-gray-200 px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-shadow duration-100"
                    >
                      +{tags.length - 2} more
                    </Badge>
                  )}
                </div>
              )}
            </div>

            <div className="absolute bottom-2 right-2 w-2 h-2 bg-gradient-to-br from-accord to-sky rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-100 shadow-sm"></div>
          </div>
        </div>
      </motion.div>

      <ContentModal isOpen={isOpen} onClose={() => setIsOpen(false)} person={person} type={type} bodyHTML={bodyHTML} />
    </>
  )
}

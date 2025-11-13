"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import type { NotionAdvisor, NotionNeutral } from "@/lib/notion-data"

type PersonType = "advisor" | "neutral" | "ombud"

interface ContentModalProps {
  isOpen: boolean
  onClose: () => void
  person: NotionAdvisor | NotionNeutral
  type: PersonType
  bodyHTML?: string // Added optional pre-rendered HTML prop
}

export function ContentModal({ isOpen, onClose, person, type, bodyHTML }: ContentModalProps) {
  const isNeutral = type === "neutral"
  const isOmbud = type === "ombud"
  const tags = isNeutral || isOmbud ? (person as NotionNeutral).tags : []
  const role = !isNeutral && !isOmbud ? (person as NotionAdvisor).role : undefined
  const bio = !isNeutral && !isOmbud ? (person as NotionAdvisor).bio : undefined

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
      <DialogContent className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{person.title}</DialogTitle>
        </DialogHeader>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col lg:flex-row gap-8 p-6"
            >
              <div className="flex-shrink-0 lg:w-80">
                <div className="relative">
                  <div className="relative w-full aspect-[4/5]">
                    <img
                      src={person.photo || "/placeholder.svg?height=400&width=320&text=No+Image"}
                      alt={person.title}
                      className="w-full h-full object-cover rounded-2xl shadow-lg"
                    />
                    <div className="absolute -inset-1 bg-gradient-to-r from-sky via-accord to-navy rounded-2xl opacity-0 hover:opacity-10 transition-opacity duration-300 -z-10" />
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <h2
                  className="text-3xl font-black text-ink mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-archivo), system-ui, sans-serif" }}
                >
                  {person.title}
                </h2>

                {role && <p className="text-lg text-accord font-medium mb-6">{role}</p>}

                {isOmbud && <p className="text-lg text-accord font-medium mb-6">Ombud</p>}

                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-navy/10 text-navy rounded-lg border-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {bio && <p className="text-lg text-gray-600 leading-relaxed mb-6">{bio}</p>}

                {bodyHTML ? (
                  <div
                    className="prose prose-lg max-w-none prose-headings:text-navy prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-accord prose-a:no-underline hover:prose-a:underline prose-ul:text-gray-700 prose-li:text-gray-700"
                    dangerouslySetInnerHTML={{ __html: bodyHTML }}
                  />
                ) : (
                  <div className="text-gray-500 italic">Additional details coming soon.</div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface PageLayoutProps {
  title: string | ReactNode // Allow title to be either string or ReactNode
  description?: string
  background?: "white" | "gray-50" | "gradient"
  children: ReactNode
}

export function PageLayout({ title, description, background = "gray-50", children }: PageLayoutProps) {
  const bgClass = {
    white: "bg-white",
    "gray-50": "bg-gray-50",
    gradient: "bg-gradient-to-b from-gray-50 to-white",
  }[background]

  return (
    <div className={`py-20 min-h-screen ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center mb-16"
        >
          {typeof title === "string" ? (
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-tight">{title}</h1>
          ) : (
            title
          )}
          {description && <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">{description}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}

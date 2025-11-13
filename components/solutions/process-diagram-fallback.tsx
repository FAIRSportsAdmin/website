"use client"

import { motion } from "framer-motion"

type Step = {
  name: string
  description?: string
  iconKey?: string
  Icon?: any
}

export function ProcessDiagramFallback({ steps }: { steps: Step[] }) {
  if (!Array.isArray(steps) || steps.length === 0) return null

  return (
    <div className="relative flex justify-between items-start pt-16" role="list" aria-label="Process steps">
      <div
        className="absolute top-8 left-0 w-full h-1 bg-gradient-to-r from-[#63CBFD] via-[#63CBFD] to-[#63CBFD] rounded-full opacity-40"
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-8 left-0 h-1 bg-gradient-to-r from-[#63CBFD] via-[#63CBFD] to-[#63CBFD] rounded-full"
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />

      {steps.map((step, i) => {
        return (
          <div
            key={`${step.name}-${i}`}
            className="group relative flex flex-col items-center text-center focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 rounded-lg"
            style={{ flex: 1 }}
            role="listitem"
            tabIndex={0}
            aria-label={`${step.name}${step.description ? `. ${step.description}` : ""}`}
          >
            <div
              className="w-16 h-16 bg-white border-2 border-white rounded-full flex items-center justify-center z-10 transition-all duration-300 group-hover:shadow-xl"
              style={{
                boxShadow: "0 4px 12px rgba(10, 34, 64, 0.15), 0 2px 4px rgba(10, 34, 64, 0.1)",
              }}
              aria-hidden="true"
            >
              <div
                className="w-8 h-8 bg-[#63CBFD] text-white rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  filter: "drop-shadow(0 1px 2px rgba(10, 34, 64, 0.1))",
                }}
                aria-hidden="true"
              >
                {i + 1}
              </div>
            </div>
            <p className="mt-4 text-sm font-semibold text-gray-900 leading-tight px-2">{step.name}</p>
            {step.description ? (
              <div
                className="absolute bottom-full mb-3 w-56 p-3 bg-gray-900 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
                role="tooltip"
                aria-hidden="true"
              >
                {step.description}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900" />
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

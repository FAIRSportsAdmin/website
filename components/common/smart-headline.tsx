"use client"

import React from "react"
import { motion as m, useReducedMotion } from "framer-motion"

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.05, // Slightly increased stagger for smoother flow
    },
  },
}

const wordVariants = {
  initial: {
    y: 8, // Reduced movement for better performance
    opacity: 0,
    fontVariationSettings: "'wght' 400",
  },
  animate: {
    y: 0,
    opacity: 1,
    fontVariationSettings: "'wght' 700",
    transition: {
      duration: 0.4, // Reduced duration for snappier feel
      ease: "easeOut",
    },
  },
}

const outlineVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: [0, 0.6, 0],
    transition: {
      delay: 0.4, // Adjusted to match new word animation duration
      duration: 0.3, // Much faster flash
      ease: "easeOut",
    },
  },
}

export function SmartHeadline({ text }: { text: string }) {
  const reduce = useReducedMotion()
  const words = text.split(" ")

  if (reduce) {
    return (
      <h1 className="font-heading text-3xl md:text-5xl text-ink leading-tight max-w-2xl mx-auto font-bold">{text}</h1>
    )
  }

  return (
    <m.h1
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="font-heading text-3xl md:text-5xl text-ink leading-tight max-w-2xl mx-auto"
    >
      {words.map((w, i) => (
        <React.Fragment key={`${w}-${i}`}>
          <m.span variants={wordVariants} className="inline-block will-change-transform relative">
            <m.span
              variants={outlineVariants}
              className="absolute inset-0 pointer-events-none -z-10 rounded-sm"
              style={{
                boxShadow: `0 0 20px rgba(0, 255, 255, 0.4), 0 0 40px rgba(255, 0, 255, 0.2)`,
                background: "linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1))",
              }}
            />
            {w}
          </m.span>
          {i < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </m.h1>
  )
}

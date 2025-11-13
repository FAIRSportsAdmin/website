"use client"
import { motion as m, useReducedMotion } from "framer-motion"
import { useState, useEffect } from "react"

export function RotatingTextSection() {
  const reduce = useReducedMotion()
  const [currentSlide, setCurrentSlide] = useState(0)

  const headlines = [
    "Confidential and streamlined process",
    "Fewer headaches and headlines",
    "Deep college sports knowledge and training",
    "Early intervention and guided resolutions",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % headlines.length)
    }, 4000) // 4 seconds per slide
    return () => clearInterval(interval)
  }, [headlines.length])

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-gray-100 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
        <div className="relative h-32 md:h-24 flex items-center justify-center">
          {headlines.map((headline, index) => (
            <m.div
              key={index}
              className={`absolute inset-0 flex items-center justify-center ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              animate={
                reduce
                  ? undefined
                  : {
                      opacity: currentSlide === index ? 1 : 0,
                      y: currentSlide === index ? 0 : 20,
                    }
              }
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight max-w-3xl">
                {headline}
              </h2>
            </m.div>
          ))}
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {headlines.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

      <div className="pb-2"></div>
    </section>
  )
}

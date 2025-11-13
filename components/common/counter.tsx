"use client"

import { useRef } from "react"
import CountUp from "react-countup"
import { useInView } from "framer-motion"

interface CounterProps {
  value: number
  className?: string
  duration?: number
}

export function Counter({ value, className, duration = 2.5 }: CounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <span ref={ref} className={className}>
      {isInView ? <CountUp end={value} duration={duration} separator="," /> : 0}
    </span>
  )
}

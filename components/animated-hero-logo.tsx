"use client"
import { motion as m, useReducedMotion } from "framer-motion"
import { useState } from "react"

export function AnimatedHeroLogo() {
  const reduce = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)

  if (reduce) {
    return (
      <div className="flex justify-center">
        <svg
          width="400"
          height="300"
          viewBox="0 0 400 300"
          className="w-auto h-[16rem] md:h-[20rem] lg:h-[24rem] max-w-[500px] max-h-[500px]"
        >
          {/* Left arrows */}
          <g fill="white">
            <path d="M40 80 L20 100 L40 120 L35 125 L10 100 L35 75 Z" />
            <path d="M40 100 L20 120 L40 140 L35 145 L10 120 L35 95 Z" />
            <path d="M40 120 L20 140 L40 160 L35 165 L10 140 L35 115 Z" />
            <path d="M40 140 L20 160 L40 180 L35 185 L10 160 L35 135 Z" />
            <path d="M40 160 L20 180 L40 200 L35 205 L10 180 L35 155 Z" />
          </g>

          {/* FAIR text */}
          <g fill="white" fontSize="72" fontFamily="Arial Black, sans-serif" fontWeight="900">
            <text x="80" y="140">
              FAIR
            </text>
          </g>

          {/* SPORTS text */}
          <g fill="white" fontSize="32" fontFamily="Arial, sans-serif" fontWeight="bold" letterSpacing="8">
            <text x="80" y="180">
              SPORTS
            </text>
          </g>

          {/* Right arrows */}
          <g fill="white">
            <path d="M360 80 L380 100 L360 120 L365 125 L390 100 L365 75 Z" />
            <path d="M360 100 L380 120 L360 140 L365 145 L390 120 L365 95 Z" />
            <path d="M360 120 L380 140 L360 160 L365 165 L390 140 L365 115 Z" />
            <path d="M360 140 L380 160 L360 180 L365 185 L390 160 L365 135 Z" />
            <path d="M360 160 L380 180 L360 200 L365 205 L390 180 L365 155 Z" />
          </g>
        </svg>
      </div>
    )
  }

  return (
    <div
      className="flex justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        width="400"
        height="300"
        viewBox="0 0 400 300"
        className="w-auto h-[16rem] md:h-[20rem] lg:h-[24rem] max-w-[500px] max-h-[500px]"
      >
        <defs>
          <style>
            {`
              .logo-path {
                fill: none;
                stroke: ${isHovered ? "#63CBFD" : "white"};
                stroke-width: 2;
                stroke-linecap: round;
                stroke-linejoin: round;
                transition: stroke 0.3s ease;
              }
              .logo-fill {
                fill: ${isHovered ? "#63CBFD" : "white"};
                transition: fill 0.3s ease;
              }
            `}
          </style>
        </defs>

        {/* Left arrows with staggered animation */}
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <m.path
              key={`left-${i}`}
              d={`M40 ${80 + i * 20} L20 ${100 + i * 20} L40 ${120 + i * 20} L35 ${125 + i * 20} L10 ${100 + i * 20} L35 ${75 + i * 20} Z`}
              className="logo-fill"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            />
          ))}
        </g>

        {/* FAIR text with stroke animation */}
        <m.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.8 }}>
          <m.path
            d="M80 140 L80 90 L130 90 L130 105 L95 105 L95 110 L125 110 L125 125 L95 125 L95 140 Z
               M140 140 L140 90 L190 90 L190 105 L155 105 L155 110 L185 110 L185 125 L155 125 L155 140 Z
               M200 140 L200 90 L215 90 L215 110 L235 110 L235 90 L250 90 L250 140 L235 140 L235 125 L215 125 L215 140 Z
               M260 140 L260 90 L310 90 L310 105 L275 105 L275 110 L305 110 L305 125 L275 125 L275 140 Z"
            className="logo-path"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
            fill={isHovered ? "#63CBFD" : "white"}
            style={{ transition: "fill 0.3s ease" }}
          />
        </m.g>

        {/* SPORTS text with stroke animation */}
        <m.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 1.2 }}>
          <m.path
            d="M80 180 L80 160 L100 160 L100 165 L85 165 L85 170 L95 170 L95 175 L85 175 L85 180 Z
               M105 180 L105 160 L115 160 L115 170 L120 170 L120 160 L130 160 L130 180 L120 180 L120 175 L115 175 L115 180 Z
               M135 180 L135 160 L150 160 L150 165 L140 165 L140 170 L145 170 L145 175 L140 175 L140 180 Z
               M155 180 L155 160 L170 160 L170 165 L160 165 L160 170 L165 170 L165 175 L160 175 L160 180 Z
               M175 180 L175 160 L185 160 L185 175 L190 175 L190 160 L200 160 L200 180 L190 180 L190 175 L185 175 L185 180 Z
               M205 180 L205 160 L220 160 L220 165 L210 165 L210 170 L215 170 L215 175 L210 175 L210 180 Z"
            className="logo-path"
            strokeDasharray="800"
            strokeDashoffset="800"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.2, delay: 1.2, ease: "easeInOut" }}
            fill={isHovered ? "#63CBFD" : "white"}
            style={{ transition: "fill 0.3s ease" }}
          />
        </m.g>

        {/* Right arrows with staggered animation */}
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <m.path
              key={`right-${i}`}
              d={`M360 ${80 + i * 20} L380 ${100 + i * 20} L360 ${120 + i * 20} L365 ${125 + i * 20} L390 ${100 + i * 20} L365 ${75 + i * 20} Z`}
              className="logo-fill"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.5 + i * 0.1,
                ease: "easeOut",
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

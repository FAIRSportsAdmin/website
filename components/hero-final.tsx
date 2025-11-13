"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion as m, useReducedMotion } from "framer-motion"
import Image from "next/image"

function LogoLockup() {
  const reduce = useReducedMotion()

  return (
    <m.div
      initial={reduce ? undefined : { opacity: 0, y: 20 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      className="mb-8 mt-16"
    >
      <div className="flex justify-center">
        <div className="relative group">
          <style jsx>{`
            .animated-logo {
              filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
            }
            
            .animated-logo svg * {
              stroke-dasharray: 1000;
              stroke-dashoffset: 1000;
              animation: drawLogo 2s ease-out forwards;
              fill: transparent;
              stroke: white;
              stroke-width: 1;
            }
            
            .animated-logo svg *:nth-child(1) { animation-delay: 0s; }
            .animated-logo svg *:nth-child(2) { animation-delay: 0.2s; }
            .animated-logo svg *:nth-child(3) { animation-delay: 0.4s; }
            .animated-logo svg *:nth-child(4) { animation-delay: 0.6s; }
            .animated-logo svg *:nth-child(5) { animation-delay: 0.8s; }
            .animated-logo svg *:nth-child(6) { animation-delay: 1.0s; }
            .animated-logo svg *:nth-child(7) { animation-delay: 1.2s; }
            .animated-logo svg *:nth-child(8) { animation-delay: 1.4s; }
            
            @keyframes drawLogo {
              0% {
                stroke-dashoffset: 1000;
                fill: transparent;
              }
              70% {
                stroke-dashoffset: 0;
                fill: transparent;
              }
              100% {
                stroke-dashoffset: 0;
                fill: white;
              }
            }
            
            .animated-logo:hover svg * {
              fill: #63CBFD;
              stroke: #63CBFD;
              transition: all 0.3s ease;
            }
          `}</style>

          <div className="animated-logo">
            <Image
              src="/assets/fair-sports-hero-white.svg"
              alt="FAIR Sports Logo"
              width={400}
              height={300}
              className="w-full max-w-md h-auto"
              style={{ maxHeight: "240px", maxWidth: "400px" }}
              priority
            />
          </div>
        </div>
      </div>
    </m.div>
  )
}

function AnimatedBackground() {
  const reduce = useReducedMotion()
  if (reduce) return null

  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1200
  const windowHeight = typeof window !== "undefined" ? window.innerHeight : 800

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <m.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{
            x: Math.random() * windowWidth,
            y: Math.random() * windowHeight,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * windowWidth,
            y: Math.random() * windowHeight,
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

export function HeroFinal() {
  const reduce = useReducedMotion()

  return (
    <section
      className="relative min-h-[85vh] flex items-center justify-center py-16 md:py-20 lg:py-22 pb-16 overflow-hidden"
      style={{
        backgroundColor: "#111827",
        backgroundImage: "linear-gradient(135deg, #111827 0%, #1e293b 50%, #111827 100%)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto px-8 md:px-12 text-center relative z-10">
        <LogoLockup />

        <div className="flex flex-col items-center">
          <m.div
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.16, delay: 0.32, ease: "easeOut" }}
            className="mt-6"
          >
            <h1
              className="font-black text-center tracking-tight leading-tight font-[900] text-2xl md:text-3xl lg:text-4xl max-w-4xl drop-shadow-lg"
              style={{
                color: "#ffffff",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.6)",
                position: "relative",
                zIndex: 10,
              }}
            >
              Forum of Arbitration & Independent Resolution
            </h1>
          </m.div>

          <m.div
            initial={reduce ? undefined : { opacity: 0, y: 30 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.16, delay: 0.44, ease: "easeOut" }}
            className="mt-8"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button
                asChild
                size="lg"
                className="px-8 py-4 text-lg font-bold rounded-xl bg-white hover:bg-gray-100 text-[#3B82F6] shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-white/25"
              >
                <Link href="/dispute-resolution-clauses">Update Your Contracts</Link>
              </Button>

              <Button
                asChild
                size="lg"
                className="px-8 py-4 text-lg font-bold rounded-xl bg-white hover:bg-gray-100 text-[#3B82F6] shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-white/25"
              >
                <Link href="/submit-case">Start Your Case</Link>
              </Button>
            </div>
          </m.div>

          <m.div
            initial={reduce ? undefined : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.6 }}
            className="mt-16"
          >
            <m.div
              animate={reduce ? undefined : { y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="w-6 h-6 border-2 border-white/40 rounded-full flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-white/60 rounded-full" />
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  )
}

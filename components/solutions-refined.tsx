"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  HelpingHand,
  Scale,
  Users,
  FileSignature,
  Gavel,
  Award,
  Speech,
  FolderSearch,
  UserCheck,
  UsersRound,
  FileText,
  ClipboardEdit,
} from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import Link from "next/link"

const solutionsData = [
  {
    id: "negotiation",
    name: "Ombuds", // Updated name from "Confidential Ombuds" to "Ombuds" for sidebar display
    title: "Confidential Ombuds", // Updated title from "Confidential Negotiation & Ombuds" to "Confidential Ombuds" for diagram header
    description:
      "Confidential dialogue facilitated by a trusted intermediary to build common ground and support fair outcomes without formal proceedings.",
    Icon: HelpingHand,
    steps: [
      {
        name: "Initial Consultation",
        icon: ClipboardEdit,
        description: "A confidential discussion to understand the core issues and goals.",
      },
      {
        name: "Guided Dialogue",
        icon: Users,
        description: "Facilitated conversations focused on mutual understanding and common ground.",
      },
      {
        name: "Consensus Building",
        icon: UsersRound,
        description: "Identifying constructive solutions and equitable outcomes without pressure or judgment.",
      },
      {
        name: "Collaborative Resolution",
        icon: Award,
        description: "A mutually acceptable outcome that preserves relationships, reputations, and opportunities.",
      },
    ],
  },
  {
    id: "mediation",
    name: "Mediation",
    title: "Facilitated Mediation",
    description:
      "Confidential discussions guided by trained and trusted sports mediators to resolve disputes without litigation.",
    Icon: UsersRound,
    steps: [
      {
        name: "Agreement to Mediate",
        icon: HelpingHand,
        description: "Parties agree to mediate and submit the matter to FAIR.", // Added period at end
      },
      {
        name: "Mediator Selection",
        icon: UserCheck,
        description: "Parties choose from FAIR's roster of experienced sports mediators.",
      },
      {
        name: "Facilitated Discussion",
        icon: Speech,
        description:
          "The mediator guides a structured, confidential discussion to find common ground and move toward resolution.",
      },
      {
        name: "Settlement Agreement",
        icon: FileSignature,
        description:
          "If successful, the parties enter into a confidential settlement agreement that reflects their resolution.",
      },
    ],
  },
  {
    id: "arbitration",
    name: "Arbitration",
    title: "Streamlined Arbitration",
    description:
      "A confidential, streamlined process with virtual hearings led by top sports arbitrators trained in college athletics.",
    Icon: Scale,
    steps: [
      {
        name: "Case Filing & Submission",
        icon: FileText,
        description: "A formal demand for arbitration is filed with FAIR, initiating the process.",
      },
      {
        name: "Arbitrator Selection",
        icon: UserCheck,
        description: "Parties choose from FAIR's roster of experienced sports arbitrators.",
      },
      {
        name: "Discovery & Briefing",
        icon: FolderSearch,
        description: "Parties exchange information and submit legal briefs to the arbitrator.",
      },
      {
        name: "Virtual Hearing",
        icon: Gavel,
        description: "Parties participate in a formal hearing via FAIR's virtual hearing platform.",
      },
      {
        name: "Final & Binding Award",
        icon: Award,
        description: "The arbitrator issues a final and binding written award, resolving the dispute.",
      },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const GradientDefinitions = () => (
  <svg width="0" height="0" className="absolute" aria-hidden="true">
    <defs>
      <linearGradient id="solutionsHeaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#63CBFD" />
        <stop offset="100%" stopColor="#63CBFD" />
      </linearGradient>
      <linearGradient id="solutionsDesktopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#63CBFD" />
        <stop offset="100%" stopColor="#63CBFD" />
      </linearGradient>
      <linearGradient id="solutionsMobileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#63CBFD" />
        <stop offset="100%" stopColor="#63CBFD" />
      </linearGradient>
    </defs>
  </svg>
)

function SolutionContent({ solution }: { solution: (typeof solutionsData)[0] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const getDescription = (solution: (typeof solutionsData)[0]) => {
    if (solution.id === "negotiation") {
      return "Confidential dialogue facilitated by a trusted intermediary to build common ground and support fair outcomes without formal proceedings."
    }
    return solution.description
  }

  return (
    <motion.div
      id={solution.id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="mb-0"
      aria-labelledby={`${solution.id}-title`}
      role="region"
    >
      <motion.div variants={itemVariants} className="flex items-center mb-8">
        <div
          className="w-12 h-12 flex items-center justify-center rounded-lg bg-white mr-5 p-2 border border-gray-100"
          style={{
            boxShadow: "0 3px 16px rgba(10, 34, 64, 0.07), 0 1px 2px rgba(0, 0, 0, 0.09)",
          }}
          aria-hidden="true"
        >
          <solution.Icon
            className="w-6 h-6"
            style={{
              stroke: "url(#solutionsHeaderGradient)",
              fill: "none",
              strokeWidth: 2,
            }}
            aria-hidden="true"
            focusable="false"
          />
        </div>
        <h3 id={`${solution.id}-title`} className="text-3xl font-bold text-text-primary">
          {solution.title}
        </h3>
      </motion.div>
      <motion.p variants={itemVariants} className="mt-8 text-xl text-text-muted mb-10 max-w-3xl leading-relaxed">
        {getDescription(solution)}
      </motion.p>

      <div
        className="relative flex justify-between items-start pt-12 lg:pt-16"
        role="list"
        aria-label={`${solution.title} process steps`}
      >
        <div className="absolute top-24 left-0 w-full h-1 bg-gray-200 rounded-full" aria-hidden="true" />
        <motion.div
          className="absolute top-24 left-0 h-1 bg-gradient-to-r from-[#63CBFD] via-[#63CBFD] to-[#63CBFD] rounded-full"
          initial={{ width: "0%" }}
          animate={isInView ? { width: "100%" } : {}}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />

        {solution.steps.map((step, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative flex flex-col items-center text-center focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 rounded-lg"
            style={{ flex: 1 }}
            role="listitem"
            tabIndex={0}
            aria-label={`${step.name}. ${step.description}`}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 rounded-full bg-white flex items-center justify-center z-10 shadow-lg transition-all duration-300 group-hover:shadow-xl border-2 border-gray-100"
              style={{
                boxShadow: "0 4px 20px rgba(10, 34, 64, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
              aria-hidden="true"
            >
              <step.icon
                className="w-8 h-8"
                style={{
                  stroke: "url(#solutionsDesktopGradient)",
                  fill: "none",
                  strokeWidth: 2,
                }}
                aria-hidden="true"
                focusable="false"
              />
            </motion.div>

            <p className="mt-5 text-base font-semibold text-text-primary leading-tight">{step.name}</p>

            <div
              className="absolute bottom-full mb-4 w-52 p-4 bg-ink text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
              style={{
                boxShadow: "0 8px 32px rgba(10, 34, 64, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
              role="tooltip"
              aria-hidden="true"
            >
              {step.description}
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-ink"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export function SolutionsRefined() {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const [activeSolution, setActiveSolution] = useState(solutionsData[0].id)

  const refs = {
    negotiation: useRef<HTMLDivElement>(null),
    mediation: useRef<HTMLDivElement>(null),
    arbitration: useRef<HTMLDivElement>(null),
  }

  useEffect(() => {
    if (!isDesktop) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSolution(entry.target.id)
          }
        })
      },
      { rootMargin: "-50% 0px -50% 0px" },
    )

    Object.values(refs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [isDesktop])

  if (!isDesktop) {
    // Mobile View: Accordion with Vertical Timeline
    return (
      <section id="solutions" className="py-24 bg-section-texture">
        <GradientDefinitions />
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={containerVariants}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black text-text-primary">
              The Resolution Roadmap
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-8 text-xl text-text-muted leading-relaxed">
              From confidential dialogue to thoughtful resolutions, our streamlined and structured process ensures every
              dispute receives the expertise and care it deserves.
            </motion.p>
          </motion.div>

          <Accordion type="single" collapsible defaultValue="negotiation" className="w-full max-w-3xl mx-auto">
            {solutionsData.map((solution) => (
              <AccordionItem
                key={solution.id}
                value={solution.id}
                className="border-b-0 bg-card-texture rounded-lg shadow-sm mb-8"
              >
                <AccordionTrigger className="text-xl font-semibold text-text-primary hover:no-underline py-5 px-7">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-lg mr-4 p-2"
                      style={{
                        background: "linear-gradient(135deg, #63CBFD 0%, #63CBFD 100%)",
                      }}
                      aria-hidden="true"
                    >
                      <solution.Icon className="w-5 h-5 text-white" />
                    </div>
                    {solution.name}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-3 pb-9 px-7">
                  <p className="text-lg text-text-muted mb-8 leading-relaxed">
                    {solution.id === "negotiation"
                      ? "Confidential dialogue facilitated by a trusted intermediary to build common ground and support fair outcomes without formal proceedings."
                      : solution.description}
                  </p>
                  <div className="relative pl-10">
                    <div
                      className="absolute left-5 top-0 h-full w-1 rounded-full"
                      style={{
                        background: "linear-gradient(180deg, #63CBFD 0%, #63CBFD 100%)",
                      }}
                    />
                    {solution.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative flex items-start mb-10 last:mb-0"
                      >
                        <div
                          className="absolute -left-5 top-1 w-10 h-10 rounded-full bg-white flex items-center justify-center z-10 border-2 border-gray-100"
                          style={{
                            boxShadow: "0 2px 12px rgba(10, 34, 64, 0.06), 0 1px 2px rgba(0, 0, 0, 0.08)",
                          }}
                          aria-hidden="true"
                        >
                          <step.icon
                            className="w-5 h-5"
                            style={{
                              stroke: "url(#solutionsMobileGradient)",
                              fill: "none",
                              strokeWidth: 2,
                            }}
                            aria-hidden="true"
                            focusable="false"
                          />
                        </div>

                        <div className="ml-10">
                          <h4 className="font-semibold text-lg text-text-primary mb-2">{step.name}</h4>
                          <p className="text-base text-text-muted leading-relaxed">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    )
  }

  // Desktop View: Sticky Nav with Horizontal Timeline
  return (
    <section id="solutions" className="py-16 bg-section-texture">
      <GradientDefinitions />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-20">
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-4xl font-black text-text-primary"
              >
                The Resolution Roadmap
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="mt-8 text-lg text-text-muted leading-relaxed"
              >
                From confidential dialogue to thoughtful resolutions, our streamlined and structured process ensures
                every dispute receives the expertise and care it deserves.
              </motion.p>
              <nav className="mt-10 space-y-2">
                {solutionsData.map((solution) => (
                  <a
                    key={solution.id}
                    href={`#${solution.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      if (typeof document === "undefined" || typeof window === "undefined") return

                      const element = document.getElementById(solution.id)
                      if (element) {
                        const elementRect = element.getBoundingClientRect()
                        const currentScrollY = window.pageYOffset
                        const targetPosition = elementRect.top + currentScrollY - 120 // 120px padding from top

                        window.scrollTo({
                          top: targetPosition,
                          behavior: "smooth",
                        })
                      }
                      setActiveSolution(solution.id)
                    }}
                    className={`group flex items-center px-5 py-3 rounded-md transition-all duration-200 ${
                      activeSolution === solution.id
                        ? "bg-card-texture shadow-sm"
                        : "text-text-muted hover:bg-card-texture/50 hover:text-text-primary"
                    }`}
                  >
                    <div
                      className={`w-2 h-7 rounded-full mr-5 transition-colors duration-200 ${
                        activeSolution === solution.id ? "bg-ink" : "bg-gray-300 group-hover:bg-ink/50"
                      }`}
                    />
                    <span className="font-semibold text-lg">{solution.name}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className="lg:col-span-2 mt-16 lg:mt-0">
            <div className="space-y-32 md:space-y-40">
              {solutionsData.map((solution) => (
                <Link
                  key={solution.id}
                  href={`/solutions/${solution.id}`}
                  className="block"
                  ref={refs[solution.id as keyof typeof refs]}
                >
                  <SolutionContent solution={solution} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HelpingHand, Scale, Users, FileText, Search, UserCheck, FileSignature, Gavel, Award } from "lucide-react"

const solutionsData = [
  {
    name: "Negotiation",
    title: "Direct Dialogue, Guided by Experts",
    description:
      "Our Ombuds program facilitates direct, confidential communication between parties to help them find mutually agreeable outcomes without formal proceedings.",
    Icon: HelpingHand,
    steps: [
      { name: "Initial Consultation", icon: HelpingHand },
      { name: "Guided Dialogue", icon: Users },
      { name: "Agreement Draft", icon: FileSignature },
      { name: "Resolution", icon: Award },
    ],
  },
  {
    name: "Mediation",
    title: "Structured Dialogue, Preventing Legal Action",
    description:
      "A neutral third-party mediator guides discussions through a structured, confidential process to help parties craft their own resolution.",
    Icon: Users,
    steps: [
      { name: "Mutual Agreement", icon: HelpingHand },
      { name: "Neutral Assignment", icon: UserCheck },
      { name: "Facilitated Discussion", icon: Users },
      { name: "Written Agreement", icon: FileSignature },
    ],
  },
  {
    name: "Arbitration",
    title: "Binding Decisions, Efficiently Delivered",
    description:
      "A formal process where a neutral arbitrator reviews evidence and arguments to render a final, binding decision, providing clarity and closure.",
    Icon: Scale,
    steps: [
      { name: "Case Submitted", icon: FileText },
      { name: "Arbitrator Selected", icon: UserCheck },
      { name: "Discovery & Briefing", icon: Search },
      { name: "Virtual Hearing", icon: Gavel },
      { name: "Decision Issued", icon: Award },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const timelineVariants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { duration: 1, ease: "easeInOut" } },
}

const stepVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
}

export function SolutionsFinal() {
  const [activeTab, setActiveTab] = useState(solutionsData[0])

  return (
    <section id="solutions" className="py-24 bg-section-texture">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-black text-text-primary">
            A Solution for Every Dispute
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-4 text-lg">
            FAIR Sports offers a tiered approach to dispute resolution, ensuring the right level of intervention for
            every situation.
          </motion.p>
        </motion.div>

        <div className="mt-12">
          <div className="flex justify-center border-b border-gray-200">
            {solutionsData.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-3 text-sm md:text-base font-semibold transition-colors ${
                  activeTab.name === tab.name ? "text-ink" : "text-text-muted hover:text-ink"
                }`}
              >
                {tab.name}
                {activeTab.name === tab.name && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-ink" />
                )}
              </button>
            ))}
          </div>

          <div className="mt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/80 shadow-md mb-4">
                    <activeTab.Icon className="h-8 w-8 text-ink" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary">{activeTab.title}</h3>
                  <p className="mt-2 text-text-muted">{activeTab.description}</p>
                </div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                  className="relative flex justify-between items-start"
                >
                  <svg className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2" preserveAspectRatio="none">
                    <motion.path
                      d={`M 0,1 L ${(100 * (activeTab.steps.length - 1)) / (activeTab.steps.length - 1)}%,1`}
                      stroke="#d1d5db"
                      strokeWidth="2"
                      variants={timelineVariants}
                      style={{ pathLength: 1, width: "100%" }}
                    />
                  </svg>

                  <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2">
                    <motion.div className="h-full bg-[#63CBFD]" variants={timelineVariants} />
                  </div>

                  {activeTab.steps.map((step, index) => (
                    <motion.div
                      key={step.name}
                      variants={stepVariants}
                      className="relative flex flex-col items-center text-center w-32"
                    >
                      <div className="w-16 h-16 bg-white/80 border-2 border-gray-200/60 rounded-full flex items-center justify-center z-10 shadow-sm">
                        <div className="w-12 h-12 bg-gray-100/80 rounded-full flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-[#63CBFD]" />
                        </div>
                      </div>
                      <p className="mt-4 text-sm font-semibold text-text-primary">{step.name}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

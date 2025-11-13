"use client"

import { motion } from "framer-motion"
import {
  Scale,
  BookOpen,
  Globe,
  Briefcase,
  Landmark,
  Sparkles,
  Clapperboard,
  BrainCircuit,
  ShieldCheck,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Counter } from "@/components/common/counter"

const stats = [
  { value: 8, label: "Attorneys from Top Global Law Firms", Icon: Briefcase },
  { value: 7, label: "Team, League & NGB General Counsels", Icon: Scale },
  { value: 6, label: "NCAA Hearing Officers", Icon: ShieldCheck },
  { value: 5, label: "Olympic & International Arbitrators", Icon: Globe },
  { value: 6, label: "Published Authors on Sports Law", Icon: BookOpen },
  { value: 2, label: "Former Federal Law Clerks", Icon: Landmark },
  { value: 2, label: "Trailblazing Women Agents (NBA & NFL)", Icon: Sparkles },
  { value: 2, label: "Senior Media & Entertainment Executives", Icon: Clapperboard },
  { value: 1, label: "Major Sports Tech Co-Founder", Icon: BrainCircuit },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

interface StatCardProps {
  value: number
  label: string
  Icon: LucideIcon
}

function StatCard({ value, label, Icon }: StatCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-white/90 border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 aspect-square"
    >
      <Icon className="w-8 h-8 text-ink/70 mb-4" />
      <div>
        <Counter value={value} className="text-5xl md:text-6xl font-black text-ink tracking-tighter" />
        <p className="mt-1 text-muted-foreground font-semibold text-sm leading-tight">{label}</p>
      </div>
    </motion.div>
  )
}

export function NeutralsExpertise() {
  return (
    <section className="py-24 bg-white-texture">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-black text-foreground">
            Expertise You Can Trust
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-4 text-lg text-muted-foreground">
            Our panel isn't just experienced—it's definitive. We've assembled the industry's most respected minds in
            sports law, governance, and business to ensure your case is understood with unparalleled depth.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

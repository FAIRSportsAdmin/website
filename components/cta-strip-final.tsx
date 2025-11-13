"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, Edit } from "lucide-react"

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export function CtaStripFinal() {
  return (
    <section id="clause-builder" className="py-16 bg-section-texture">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <motion.div
            variants={cardVariants}
            className="relative p-8 md:p-12 rounded-lg overflow-hidden bg-card-texture border border-gray-200/50"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 flex items-center justify-center rounded-md bg-white/80 shadow-sm mb-4">
                <FileText className="w-6 h-6 text-accent-accord" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary">Update Your Contracts</h3>
              <p className="mt-2 mb-6 max-w-md">
                Stay prepared by incorporating FAIR's dispute resolution clauses into your agreements (for free).
              </p>
              <Button asChild className="rounded-md font-semibold">
                <Link href="/dispute-resolution-clauses">Update Your Contracts</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="relative p-8 md:p-12 rounded-lg overflow-hidden bg-card-texture border border-gray-200/50"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 flex items-center justify-center rounded-md bg-white/80 shadow-sm mb-4">
                <Edit className="w-6 h-6 text-accent-accord" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary">Start Your Case</h3>
              <p className="mt-2 mb-6 max-w-md">
                Ready to resolve a dispute? Submit your case to our team of experienced neutrals for a fast and fair
                process.
              </p>
              <Button asChild className="rounded-md font-semibold">
                <Link href="/submit-case">Start Your Case</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

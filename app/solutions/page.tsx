import { createMetadata } from "@/lib/metadata"
import Link from "next/link"
import { HelpingHand, UsersRound, Scale, ArrowRight, type LucideIcon } from "lucide-react"

export const metadata = createMetadata({
  title: "Solutions",
  description:
    "Explore FAIR Sports' dispute resolution solutions: Negotiation (Ombuds), Mediation, and Arbitration. Find the right pathway for your situation.",
  path: "/solutions",
})

const ICONS: Record<string, LucideIcon> = {
  HelpingHand,
  UsersRound,
  Scale,
}

const solutions = [
  {
    href: "/solutions/ombuds",
    title: "Negotiation (Ombuds)",
    description:
      "A friendly, confidential intermediary who surfaces and resolves issues early—keeping communication open and trust intact.",
    iconKey: "HelpingHand",
  },
  {
    href: "/solutions/mediation",
    title: "Mediation",
    description:
      "Structured dialogue with a neutral expert to avoid legal action and craft a mutually agreeable, binding resolution.",
    iconKey: "UsersRound",
  },
  {
    href: "/solutions/arbitration",
    title: "Arbitration",
    description:
      "Fast, affordable, and confidential resolution by seasoned sports arbitrators—resulting in a final and binding decision.",
    iconKey: "Scale",
  },
]

export default function SolutionsIndexPage() {
  return (
    <div className="py-[var(--section-y-padding)] bg-gray-50">
      <div className="max-w-[var(--container-max-width)] mx-auto px-6 md:px-8">
        <section>
          <p className="text-sm tracking-wide text-accord font-semibold mb-3">FAIR Solutions</p>
          <h1 className="text-4xl md:text-5xl font-black text-ink mb-6">Resolution, Tailored to the Moment</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            From confidential guidance to binding decisions, our tiered model ensures the right level of intervention
            for every dispute. Choose the pathway that fits your needs.
          </p>
        </section>

        <section className="pt-[var(--section-y-padding)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--grid-gap)]">
            {solutions.map(({ href, title, description, iconKey }) => {
              const Icon = ICONS[iconKey]
              return (
                <Link
                  key={href}
                  href={href}
                  className="group bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
                    {Icon && <Icon className="w-6 h-6 text-ink" />}
                  </div>
                  <h2 className="text-xl font-bold text-ink mb-2">{title}</h2>
                  <p className="text-gray-600 flex-1">{description}</p>
                  <span className="mt-4 inline-flex items-center text-accord font-semibold">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

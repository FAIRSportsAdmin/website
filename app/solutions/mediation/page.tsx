import { createMetadata } from "@/lib/metadata"
import { solutionsContent } from "@/lib/solutions-data"
import { ProcessDiagramFallback } from "@/components/solutions/process-diagram-fallback"
import { FaqAccordion } from "@/components/solutions/faq-accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ErrorBoundary } from "@/components/common/error-boundary"

export const metadata = createMetadata({
  title: "Mediation",
  description:
    "Structured dialogue with a neutral expert to avoid legal action and craft a mutually agreeable, binding resolution.",
  path: "/solutions/mediation",
})

export default function MediationPage() {
  const data = solutionsContent.mediation

  return (
    <div className="py-[var(--section-y-padding)] bg-gray-50">
      <div className="max-w-[var(--container-max-width)] mx-auto px-6 md:px-8">
        {/* Hero */}
        <section className="text-center">
          <h1 className="font-black text-ink tracking-tight leading-tight font-[900] text-3xl md:text-4xl lg:text-5xl max-w-4xl mb-6 mx-auto">
            FAIR Mediation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{data.valueProp}</p>
          <div className="flex flex-wrap gap-3 mt-8 justify-center">
            <Button asChild>
              <Link href="/submit-case">Begin Mediation</Link>
            </Button>
          </div>
        </section>

        {/* Process Diagram */}
        <section className="pt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-ink mb-10 text-center">{data.process.title}</h2>
          <ErrorBoundary>
            <ProcessDiagramFallback steps={data.process.steps} />
          </ErrorBoundary>
        </section>

        {/* Use Cases & FAQs */}
        <section className="pt-[var(--section-y-padding)] grid md:grid-cols-2 gap-x-16 gap-y-12">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-ink mb-5">{data.useCases.title}</h3>
            <ul className="space-y-3">
              {data.useCases.cases.map((item) => (
                <li key={item} className="flex items-start">
                  <div className="w-5 h-5 bg-[#63CBFD] rounded-full mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-ink mb-5">{data.faqs.title}</h3>
            <FaqAccordion faqs={data.faqs.items} />
          </div>
        </section>
      </div>
    </div>
  )
}

import { createMetadata } from "@/lib/metadata"
import { solutionsContent } from "@/lib/solutions-data"
import { ProcessDiagram } from "@/components/solutions/process-diagram"
import { FaqAccordion } from "@/components/solutions/faq-accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Shield } from "lucide-react"
import { ErrorBoundary } from "@/components/common/error-boundary"
import { Suspense } from "react"
import { PersonGridSkeleton } from "@/components/common/loading-states"
import OmbudsListServer from "@/components/ombuds-list-server"

export const metadata = createMetadata({
  title: "Ombuds", // Simplified from "Negotiation (Ombuds)" to just "Ombuds"
  description:
    "A friendly, confidential intermediary who surfaces and resolves issues early—keeping communication open and trust intact.",
  path: "/solutions/ombuds",
})

export default function NegotiationPage() {
  const data = solutionsContent.negotiation

  return (
    <div className="py-[var(--section-y-padding)] bg-gray-50">
      <div className="max-w-[var(--container-max-width)] mx-auto px-6 md:px-8">
        {/* Hero */}
        <section className="text-center">
          <h1 className="font-black text-ink tracking-tight leading-tight font-[900] text-3xl md:text-4xl lg:text-5xl max-w-4xl mb-6 mx-auto">
            FAIR Ombuds
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{data.valueProp}</p>
          <div className="flex flex-wrap gap-3 mt-8 justify-center">
            <Button asChild>
              <Link href="/confidential-inquiry">Start a conversation</Link>
            </Button>
          </div>
        </section>

        {/* Our Ombuds Staff */}
        <section className="pt-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4">Meet Your Dispute Resolution Coaches</h2>
          </div>
          <div className="flex justify-center">
            <Suspense fallback={<PersonGridSkeleton count={3} />}>
              <OmbudsListServer />
            </Suspense>
          </div>
        </section>

        {/* Process Diagram */}
        <section className="pt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-ink mb-10 text-center">{data.process.title}</h2>
          <ErrorBoundary>
            <ProcessDiagram steps={data.process.steps} />
          </ErrorBoundary>
        </section>

        {/* Need Confidential Support? */}
        <section className="pt-[var(--section-y-padding)]">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4">Need Confidential Support?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Reach out to our ombuds staff to start a confidential conversation.
            </p>
            <Button asChild size="lg" className="font-bold">
              <Link href="/confidential-inquiry">Start a Conversation</Link>
            </Button>
          </div>

          {/* Confidentiality Notice */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-2 text-base">Confidentiality Notice</p>
                  <p>
                    All communications with our ombuds staff are strictly confidential and will not be shared without
                    your explicit consent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases & FAQs */}
        <section className="pt-[var(--section-y-padding)] grid md:grid-cols-2 gap-x-16 gap-y-12">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-ink mb-5">{data.useCases.title}</h3>
            <ul className="space-y-3">
              {data.useCases.cases.map((item) => (
                <li key={item} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-sky mr-3 mt-1 flex-shrink-0" />
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

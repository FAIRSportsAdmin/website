import { createMetadata } from "@/lib/metadata"
import ConfidentialInquiryForm from "@/components/confidential-inquiry-form"

export const metadata = createMetadata({
  title: "Start a Conversation",
  description: "Submit a confidential inquiry to our ombuds staff for private guidance and support.",
  path: "/confidential-inquiry",
})

export default function ConfidentialInquiryPage() {
  return (
    <div className="py-[var(--section-y-padding)] bg-gray-50">
      <div className="max-w-[var(--container-max-width)] mx-auto px-6 md:px-8">
        <section className="text-center mb-12">
          <h1 className="font-black text-ink tracking-tight leading-tight font-[900] text-3xl md:text-4xl lg:text-5xl max-w-4xl mb-6 mx-auto">
            Start a Conversation
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reach out to our ombuds staff to start a confidential conversation.
          </p>
        </section>

        <div className="max-w-2xl mx-auto">
          <ConfidentialInquiryForm />
        </div>
      </div>
    </div>
  )
}

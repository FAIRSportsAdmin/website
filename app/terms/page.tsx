import { createMetadata } from "@/lib/metadata"
import { PageLayout } from "@/components/layout/page-layout"

export const metadata = createMetadata({
  title: "Terms and Conditions",
  description: "Terms and Conditions for FAIR Sports dispute resolution services.",
  path: "/terms",
})

export default function TermsPage() {
  return (
    <PageLayout title="Terms and Conditions" description="" background="gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-lg text-gray-600 text-center">Coming Soon</p>
        </div>
      </div>
    </PageLayout>
  )
}

import { createMetadata } from "@/lib/metadata"
import { PageLayout } from "@/components/layout/page-layout"

export const metadata = createMetadata({
  title: "Cookie Policy",
  description: "Cookie Policy for FAIR Sports dispute resolution services.",
  path: "/cookies",
})

export default function CookiesPage() {
  return (
    <PageLayout title="Cookie Policy" description="" background="gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-lg text-gray-600 text-center">Coming Soon</p>
        </div>
      </div>
    </PageLayout>
  )
}

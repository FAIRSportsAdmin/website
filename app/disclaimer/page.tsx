import { createMetadata } from "@/lib/metadata"
import { PageLayout } from "@/components/layout/page-layout"

export const metadata = createMetadata({
  title: "Disclaimer",
  description: "Legal disclaimer for FAIR Sports dispute resolution services.",
  path: "/disclaimer",
})

export default function DisclaimerPage() {
  return (
    <PageLayout title="Disclaimer" description="" background="gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">
              This website is for informational purposes only and is not a solicitation for business. None of the
              content on this website is offered as legal advice nor a legal opinion, and it should not be treated as
              such. FAIR Sports is not engaged in the practice of law and no attorney-client relationship is intended or
              created hereunder, including a user's submission of information through the website. While FAIR Sports
              endeavors to keep the information on this website updated and correct, FAIR Sports makes no
              representations or warranties of any kind, express or implied, about the completeness, accuracy, or
              reliability of the information on this website or any internal or external links presented herein.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

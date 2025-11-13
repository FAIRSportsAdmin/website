import { PageLayout } from "@/components/page-layout"

export default function PortalPage() {
  return (
    <PageLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Case Portal</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            To submit your case and access the portal, contact us{" "}
            <a href="mailto:admin@fairsports.org" className="text-blue-600 hover:text-blue-800 underline">
              admin@fairsports.org
            </a>
          </p>
        </div>
      </div>
    </PageLayout>
  )
}

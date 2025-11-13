import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"
import { PersonGridSkeleton } from "@/components/common/loading-states"
import OmbudsListServer from "@/components/ombuds-list-server"
import { headers } from "next/headers"

export const metadata = {
  title: "Ombuds Staff - FAIR Sports",
  description: "Meet our ombuds staff who provide confidential dialogue facilitated by trusted intermediaries.",
}

export const dynamic = "force-dynamic"

export const revalidate = 0 // No caching at all

export default function OmbudsPage() {
  const headersList = headers()
  const timestamp = Date.now()

  return (
    <PageLayout
      title="Your Dispute Resolution Coaches"
      description="Confidential dialogue facilitated by a trusted intermediary to build common ground and support fair outcomes without formal proceedings."
      background="gray-50"
    >
      <div className="flex justify-center mb-12">
        <Button asChild size="lg" className="font-bold">
          <Link href="/confidential-inquiry">Start a Conversation</Link>
        </Button>
      </div>

      <Suspense fallback={<PersonGridSkeleton count={3} />}>
        <OmbudsListServer key={timestamp} />
      </Suspense>
    </PageLayout>
  )
}

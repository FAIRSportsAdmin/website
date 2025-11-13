import { PageLayout } from "@/components/layout/page-layout"
import { PersonGridSkeleton } from "@/components/common/loading-states"

export default function Loading() {
  return (
    <PageLayout
      title="Our Neutrals"
      description="FAIR Sports neutrals have experience as club and league general counsels, media and entertainment executives, trailblazing sports agents, award-winning professors, big firm lawyers, federal law clerks, industry-leading authors, Olympic arbitrators, and former college athletes."
      background="gray-50"
    >
      <div className="animate-pulse">
        <div className="mb-8 h-16 bg-gray-200/60 rounded-lg" />
        <PersonGridSkeleton count={8} />
      </div>
    </PageLayout>
  )
}

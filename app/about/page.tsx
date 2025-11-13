import { PageLayout } from "@/components/layout/page-layout"
import { createMetadata } from "@/lib/metadata"

export const metadata = createMetadata({
  title: "About",
  description:
    "Learn about FAIR Sports' mission to provide specialized dispute resolution services for college athletics.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <PageLayout title="About FAIR Sports" description="Leading the way in college sports dispute resolution.">
      {/* Using card texture background instead of solid white */}
      <div className="max-w-3xl mx-auto bg-card-texture p-8 md:p-12 rounded-lg shadow-sm border border-gray-200/50">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Our Mission</h2>
          <p>
            FAIR Sports was founded to address the growing need for specialized dispute resolution services in college
            athletics. We provide fast, affordable, and reliable alternatives to traditional litigation, helping
            institutions, athletes, and other stakeholders resolve conflicts while preserving relationships and
            protecting the integrity of collegiate sports.
          </p>
          <h2 className="text-2xl font-bold text-text-primary mb-4 mt-8">Our History</h2>
          <p>
            Established by leading experts in sports law and alternative dispute resolution, FAIR Sports emerged from
            the recognition that college athletics needed specialized arbitration and mediation services. Our founders
            brought together decades of experience in legal practice, athletic administration, and conflict resolution
            to create a forum uniquely suited to the challenges of modern college sports.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}

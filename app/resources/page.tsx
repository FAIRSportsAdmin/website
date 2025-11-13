import { createMetadata } from "@/lib/metadata"
import { PageLayout } from "@/components/layout/page-layout"
import { ResourceCategoryCard } from "@/components/resources/resource-category-card"

export const metadata = createMetadata({
  title: "Resources",
  description:
    "Educational materials, guides, and tools to help you navigate college sports disputes. Legal guides, videos, research articles, and downloadable forms.",
  path: "/resources",
})

const resourceCategories = [
  {
    iconKey: "FileText",
    title: "Legal Guides",
    href: "/resources/legal-guides",
    description: "Comprehensive guides on college sports law and dispute resolution",
    items: [
      "Understanding NCAA Compliance",
      "NIL Agreement Best Practices",
      "Transfer Portal Guidelines",
      "Title IX in Athletics",
    ],
  },
  {
    iconKey: "Video",
    title: "Educational Videos",
    href: "/resources/educational-videos",
    description: "Video content explaining key concepts and processes",
    items: [
      "Introduction to Sports Arbitration",
      "Mediation vs. Litigation",
      "Case Study: Successful Resolution",
      "Working with FAIR Sports",
    ],
  },
  {
    iconKey: "BookOpen",
    title: "Research & Articles",
    href: "/resources/research-articles",
    description: "In-depth analysis and thought leadership pieces",
    items: [
      "Trends in College Sports Disputes",
      "The Future of Athletic Governance",
      "Cost-Benefit Analysis of ADR",
      "International Sports Law Perspectives",
    ],
  },
  {
    iconKey: "Download",
    title: "Forms & Templates",
    href: "/resources/forms-templates",
    description: "Downloadable resources for common processes",
    items: ["Dispute Filing Forms", "Contract Templates", "Mediation Agreements", "Arbitration Clauses"],
  },
]

export default function ResourcesPage() {
  return (
    <PageLayout
      title="Resources"
      description="Educational materials, guides, and tools to help you navigate college sports disputes"
      background="gray-50"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resourceCategories.map((category) => (
          <ResourceCategoryCard key={category.title} category={category} />
        ))}
      </div>
    </PageLayout>
  )
}

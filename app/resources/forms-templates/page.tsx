import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createMetadata } from "@/lib/metadata"
import { TemplateCard } from "@/components/resources/template-card"

export const metadata = createMetadata({
  title: "Forms & Templates",
  description:
    "Downloadable legal forms, contract templates, and dispute resolution documents for college sports. Professional templates from FAIR Sports experts.",
  path: "/resources/forms-templates",
})

const templates = [
  {
    title: "Standard Arbitration Clause Template",
    description:
      "A comprehensive arbitration clause template designed specifically for college sports contracts and agreements.",
    category: "Arbitration",
    iconKey: "Scale",
    fileType: "DOCX",
    fileSize: "45 KB",
    downloads: 1247,
    lastUpdated: "December 2024",
    difficulty: "Intermediate",
    featured: true,
  },
  {
    title: "Mediation Agreement Form",
    description: "Standard mediation agreement form for initiating mediation proceedings in college sports disputes.",
    category: "Mediation",
    iconKey: "Users",
    fileType: "PDF",
    fileSize: "32 KB",
    downloads: 892,
    lastUpdated: "November 2024",
    difficulty: "Beginner",
    featured: true,
  },
  {
    title: "Expedited Arbitration Clause",
    description: "Specialized arbitration clause for time-sensitive disputes requiring rapid resolution procedures.",
    category: "Arbitration",
    iconKey: "Clock",
    fileType: "DOCX",
    fileSize: "38 KB",
    downloads: 634,
    lastUpdated: "November 2024",
    difficulty: "Advanced",
    featured: false,
  },
  {
    title: "Dispute Filing Form",
    description: "Comprehensive form for initiating dispute resolution proceedings with FAIR Sports neutrals.",
    category: "Filing",
    iconKey: "FileText",
    fileType: "PDF",
    fileSize: "28 KB",
    downloads: 1156,
    lastUpdated: "October 2024",
    difficulty: "Beginner",
    featured: false,
  },
  {
    title: "Confidentiality Agreement Template",
    description: "Standard confidentiality agreement for use in mediation and arbitration proceedings.",
    category: "Confidentiality",
    iconKey: "Shield",
    fileType: "DOCX",
    fileSize: "41 KB",
    downloads: 723,
    lastUpdated: "October 2024",
    difficulty: "Intermediate",
    featured: false,
  },
  {
    title: "NIL Dispute Resolution Clause",
    description: "Specialized clause for Name, Image, and Likeness agreements to address potential disputes.",
    category: "NIL",
    iconKey: "FileText",
    fileType: "DOCX",
    fileSize: "52 KB",
    downloads: 945,
    lastUpdated: "September 2024",
    difficulty: "Advanced",
    featured: false,
  },
  {
    title: "Coaching Contract Arbitration Addendum",
    description: "Addendum template for incorporating arbitration provisions into coaching contracts.",
    category: "Contracts",
    iconKey: "Users",
    fileType: "DOCX",
    fileSize: "47 KB",
    downloads: 567,
    lastUpdated: "September 2024",
    difficulty: "Advanced",
    featured: false,
  },
  {
    title: "Student-Athlete Grievance Form",
    description: "Standardized form for student-athletes to file grievances and initiate dispute resolution.",
    category: "Student Affairs",
    iconKey: "FileText",
    fileType: "PDF",
    fileSize: "35 KB",
    downloads: 834,
    lastUpdated: "August 2024",
    difficulty: "Beginner",
    featured: false,
  },
]

export default function FormsTemplatesPage() {
  const featuredTemplates = templates.filter((template) => template.featured)
  const regularTemplates = templates.filter((template) => !template.featured)

  return (
    <PageLayout
      title="Forms & Templates"
      description="Professional legal forms and contract templates for college sports"
      background="gray-50"
    >
      {/* Featured Templates */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-navy mb-8">Most Popular Templates</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredTemplates.map((template, index) => (
            <TemplateCard key={index} template={template} featured />
          ))}
        </div>
      </div>

      {/* All Templates */}
      <div>
        <h2 className="text-2xl font-bold text-navy mb-8">All Forms & Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularTemplates.map((template, index) => (
            <TemplateCard key={index} template={template} />
          ))}
        </div>
      </div>

      {/* Custom Templates CTA */}
      <div className="mt-16 bg-gradient-to-r from-navy to-accord rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Need Custom Templates?</h2>
        <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
          Our standard templates cover most situations, but every institution has unique needs. Contact our legal
          experts to create custom forms and templates tailored to your specific requirements.
        </p>
        <Button size="lg" className="bg-white text-navy hover:bg-gray-100 px-8 py-3 rounded-xl font-bold">
          <Link href="/contact">Request Custom Templates</Link>
        </Button>
      </div>
    </PageLayout>
  )
}

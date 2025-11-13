import { PageLayout } from "@/components/layout/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, BookOpen } from "lucide-react"
import Link from "next/link"
import { createMetadata } from "@/lib/metadata"

export const metadata = createMetadata({
  title: "Legal Guides",
  description:
    "Comprehensive legal guides on college sports law, dispute resolution, and compliance. Expert resources for navigating NCAA regulations and athletic governance.",
  path: "/resources/legal-guides",
})

export default function LegalGuidesPage() {
  const guides = [
    {
      title: "Understanding NCAA Compliance in the Modern Era",
      description:
        "A comprehensive guide to navigating NCAA regulations, compliance requirements, and best practices for athletic departments and institutions.",
      category: "Compliance",
      readTime: "15 min read",
      difficulty: "Intermediate",
      lastUpdated: "December 2024",
      topics: ["NCAA Rules", "Compliance", "Athletic Administration"],
      featured: true,
    },
    {
      title: "NIL Agreement Best Practices",
      description:
        "Essential guidelines for structuring Name, Image, and Likeness agreements that protect both athletes and institutions while ensuring compliance.",
      category: "NIL",
      readTime: "12 min read",
      difficulty: "Advanced",
      lastUpdated: "November 2024",
      topics: ["NIL", "Contracts", "Student-Athletes"],
      featured: true,
    },
    {
      title: "Transfer Portal Guidelines and Legal Considerations",
      description:
        "Navigate the complexities of the transfer portal, including eligibility requirements, timing considerations, and dispute resolution.",
      category: "Transfer Portal",
      readTime: "10 min read",
      difficulty: "Intermediate",
      lastUpdated: "October 2024",
      topics: ["Transfer Portal", "Eligibility", "Student Rights"],
      featured: false,
    },
    {
      title: "Title IX in Athletics: A Comprehensive Overview",
      description:
        "Understanding Title IX requirements, compliance obligations, and best practices for ensuring gender equity in collegiate athletics.",
      category: "Title IX",
      readTime: "18 min read",
      difficulty: "Advanced",
      lastUpdated: "September 2024",
      topics: ["Title IX", "Gender Equity", "Compliance"],
      featured: false,
    },
    {
      title: "Arbitration Clauses in Athletic Contracts",
      description:
        "How to draft effective arbitration clauses for coaching contracts, facility agreements, and other athletic department contracts.",
      category: "Arbitration",
      readTime: "8 min read",
      difficulty: "Advanced",
      lastUpdated: "August 2024",
      topics: ["Arbitration", "Contracts", "Dispute Resolution"],
      featured: false,
    },
    {
      title: "Student-Athlete Rights and Grievance Procedures",
      description:
        "A guide to understanding student-athlete rights, institutional grievance procedures, and when external dispute resolution may be appropriate.",
      category: "Student Rights",
      readTime: "14 min read",
      difficulty: "Beginner",
      lastUpdated: "July 2024",
      topics: ["Student Rights", "Grievances", "Due Process"],
      featured: false,
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const featuredGuides = guides.filter((guide) => guide.featured)
  const regularGuides = guides.filter((guide) => !guide.featured)

  return (
    <PageLayout
      title="Legal Guides"
      description="Comprehensive guides on college sports law and dispute resolution"
      background="gray-50"
    >
      {/* Featured Guides */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-navy mb-8">Featured Guides</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredGuides.map((guide, index) => (
            <Card key={index} className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <Badge className="bg-accord/10 text-accord border-0 font-medium">{guide.category}</Badge>
                  <Badge className={`${getDifficultyColor(guide.difficulty)} border-0 text-xs font-medium`}>
                    {guide.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-navy leading-tight">{guide.title}</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">{guide.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{guide.readTime}</span>
                  </div>
                  <span>•</span>
                  <span>Updated {guide.lastUpdated}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {guide.topics.map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs border-gray-300 text-gray-600">
                      {topic}
                    </Badge>
                  ))}
                </div>

                <Button className="bg-navy hover:bg-ink text-white w-full">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read Guide
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Guides */}
      <div>
        <h2 className="text-2xl font-bold text-navy mb-8">All Legal Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularGuides.map((guide, index) => (
            <Card key={index} className="bg-white shadow-md border-0 hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-sky/10 text-navy border-0 text-xs font-medium">{guide.category}</Badge>
                  <Badge className={`${getDifficultyColor(guide.difficulty)} border-0 text-xs`}>
                    {guide.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-bold text-navy leading-tight">{guide.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{guide.description}</p>

                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{guide.readTime}</span>
                  </div>
                  <span>•</span>
                  <span>{guide.lastUpdated}</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-navy text-navy hover:bg-navy hover:text-white bg-transparent"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Read Guide
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-gradient-to-r from-navy to-accord rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Need Personalized Legal Guidance?</h2>
        <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
          Our legal guides provide general information, but every situation is unique. Contact our experts for
          personalized advice on your specific legal matters.
        </p>
        <Button size="lg" className="bg-white text-navy hover:bg-gray-100 px-8 py-3 rounded-xl font-bold">
          <Link href="/contact">Consult Our Legal Experts</Link>
        </Button>
      </div>
    </PageLayout>
  )
}

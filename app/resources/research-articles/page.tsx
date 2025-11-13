import { PageLayout } from "@/components/layout/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, TrendingUp, ExternalLink, BookOpen } from "lucide-react"
import { createMetadata } from "@/lib/metadata"

export const metadata = createMetadata({
  title: "Research & Articles",
  description:
    "In-depth research and thought leadership on college sports dispute resolution, industry trends, and legal analysis from FAIR Sports experts.",
  path: "/resources/research-articles",
})

export default function ResearchArticlesPage() {
  const articles = [
    {
      title: "The Future of Athletic Governance: Trends in College Sports Dispute Resolution",
      excerpt:
        "An analysis of emerging trends in college sports governance and how alternative dispute resolution is reshaping the landscape of athletic administration.",
      author: "Dr. Sarah Mitchell",
      publishDate: "December 15, 2024",
      readTime: "12 min read",
      category: "Industry Analysis",
      tags: ["Governance", "Trends", "ADR"],
      featured: true,
      type: "Research Paper",
    },
    {
      title: "Cost-Benefit Analysis of Alternative Dispute Resolution in College Athletics",
      excerpt:
        "A comprehensive study examining the financial and operational benefits of ADR compared to traditional litigation in athletic disputes.",
      author: "Prof. Michael Chen",
      publishDate: "November 28, 2024",
      readTime: "18 min read",
      category: "Economic Analysis",
      tags: ["Cost Analysis", "ADR", "Economics"],
      featured: true,
      type: "Research Study",
    },
    {
      title: "International Perspectives on Sports Arbitration: Lessons for College Athletics",
      excerpt:
        "Examining international sports arbitration models and their potential applications to American college athletics governance.",
      author: "Elena Rodriguez, JD",
      publishDate: "November 10, 2024",
      readTime: "15 min read",
      category: "Comparative Law",
      tags: ["International Law", "Arbitration", "Comparative Analysis"],
      featured: false,
      type: "Legal Analysis",
    },
    {
      title: "NIL Disputes and Resolution Mechanisms: A Year in Review",
      excerpt:
        "Analysis of Name, Image, and Likeness disputes that emerged in 2024 and the effectiveness of various resolution approaches.",
      author: "James Thompson",
      publishDate: "October 22, 2024",
      readTime: "10 min read",
      category: "NIL Analysis",
      tags: ["NIL", "Disputes", "Case Studies"],
      featured: false,
      type: "Industry Report",
    },
    {
      title: "The Role of Mediation in Title IX Athletic Disputes",
      excerpt:
        "Exploring how mediation can effectively address Title IX compliance issues while preserving institutional relationships.",
      author: "Dr. Amanda Foster",
      publishDate: "October 5, 2024",
      readTime: "14 min read",
      category: "Title IX",
      tags: ["Title IX", "Mediation", "Gender Equity"],
      featured: false,
      type: "Case Study",
    },
    {
      title: "Technology and Transparency in Sports Dispute Resolution",
      excerpt:
        "How digital platforms and technology are improving transparency and efficiency in college sports dispute resolution processes.",
      author: "Tech Innovation Team",
      publishDate: "September 18, 2024",
      readTime: "8 min read",
      category: "Technology",
      tags: ["Technology", "Innovation", "Transparency"],
      featured: false,
      type: "White Paper",
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Research Paper":
        return "bg-blue-100 text-blue-800"
      case "Research Study":
        return "bg-purple-100 text-purple-800"
      case "Legal Analysis":
        return "bg-green-100 text-green-800"
      case "Industry Report":
        return "bg-orange-100 text-orange-800"
      case "Case Study":
        return "bg-red-100 text-red-800"
      case "White Paper":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const featuredArticles = articles.filter((article) => article.featured)
  const regularArticles = articles.filter((article) => !article.featured)

  return (
    <PageLayout
      title="Research & Articles"
      description="In-depth analysis and thought leadership on college sports dispute resolution"
      background="gray-50"
    >
      {/* Featured Research */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-6 h-6 text-accord" />
          <h2 className="text-2xl font-bold text-navy">Featured Research</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredArticles.map((article, index) => (
            <Card key={index} className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <Badge className="bg-accord/10 text-accord border-0 font-medium">{article.category}</Badge>
                  <Badge className={`${getTypeColor(article.type)} border-0 text-xs font-medium`}>{article.type}</Badge>
                </div>
                <CardTitle className="text-xl font-bold text-navy leading-tight">{article.title}</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">{article.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{article.publishDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border-gray-300 text-gray-600">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="bg-navy hover:bg-ink text-white w-full">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read Full Article
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Articles */}
      <div>
        <h2 className="text-2xl font-bold text-navy mb-8">All Research & Articles</h2>
        <div className="space-y-6">
          {regularArticles.map((article, index) => (
            <Card key={index} className="bg-white shadow-md border-0 hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-sky/10 text-navy border-0 text-xs font-medium">{article.category}</Badge>
                      <Badge className={`${getTypeColor(article.type)} border-0 text-xs`}>{article.type}</Badge>
                    </div>

                    <h3 className="text-lg font-bold text-navy leading-tight mb-2">{article.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{article.excerpt}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{article.publishDate}</span>
                      </div>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-gray-300 text-gray-600">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="lg:w-48 flex-shrink-0">
                    <Button className="bg-navy hover:bg-ink text-white w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Article
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="mt-16 bg-gradient-to-r from-navy to-accord rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Updated on Latest Research</h2>
        <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
          Subscribe to our research newsletter and be the first to access new studies, analysis, and insights on college
          sports dispute resolution.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-xl text-navy placeholder:text-gray-500"
          />
          <Button size="lg" className="bg-white text-navy hover:bg-gray-100 px-6 font-bold rounded-xl">
            Subscribe
          </Button>
        </div>
      </div>
    </PageLayout>
  )
}

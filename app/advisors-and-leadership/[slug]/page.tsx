import { getAdvisorBySlug, getAdvisorsData } from "@/lib/notion-data"
import { renderNotionBlocks } from "@/lib/notion-render"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { createMetadata } from "@/lib/metadata"
import Image from "next/image"

export const revalidate = 3600

export async function generateStaticParams() {
  const advisors = await getAdvisorsData()
  return advisors
    .map((a) => a.slug)
    .filter((slug): slug is string => !!slug && slug.trim().length > 0)
    .map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const advisor = await getAdvisorBySlug(slug)
  if (!advisor) {
    return createMetadata({
      title: "Advisor Not Found",
      description: "The advisor profile you're looking for could not be found.",
    })
  }
  return createMetadata({
    title: advisor.title,
    description: advisor.bio || `Learn more about ${advisor.title}, ${advisor.role} at FAIR Sports.`,
    path: `/advisors-and-leadership/${advisor.slug}`,
    image: advisor.photo,
  })
}

export default async function AdvisorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const advisor = await getAdvisorBySlug(slug)
  if (!advisor) notFound()

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="text-navy hover:text-accord">
            <Link href="/advisors-and-leadership" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Advisors & Leadership
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-sky via-accord to-navy rounded-2xl opacity-0 hover:opacity-20 transition-opacity duration-300 -z-10" />
          <div className="p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              <div className="flex-shrink-0 mx-auto lg:mx-0">
                <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={advisor!.photo || "/placeholder.svg?height=300&width=300&query=advisor-photo"}
                    alt={advisor!.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 224px, 224px"
                  />
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-black text-ink mb-6 tracking-tight">{advisor!.title}</h1>
                {advisor!.role && <p className="text-lg text-accord font-medium mb-6">{advisor!.role}</p>}
                {advisor!.bio && <p className="text-lg text-gray-600 leading-relaxed mb-6">{advisor!.bio}</p>}
              </div>
            </div>
          </div>
        </div>

        {advisor!.body && advisor!.body.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div
              className="prose prose-lg max-w-none prose-headings:text-navy prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-accord prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: renderNotionBlocks(advisor!.body) }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

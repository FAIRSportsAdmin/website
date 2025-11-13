import { getNeutralBySlug, getNeutralsData } from "@/lib/notion-data"
import { renderNotionBlocks } from "@/lib/notion-render"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { createMetadata } from "@/lib/metadata"
import Image from "next/image"

export const revalidate = 3600

export async function generateStaticParams() {
  const neutrals = await getNeutralsData()
  return neutrals
    .map((neutral) => neutral.slug)
    .filter((slug): slug is string => !!slug && slug.trim().length > 0)
    .map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const neutral = await getNeutralBySlug(slug)
  if (!neutral) {
    return createMetadata({
      title: "Neutral Not Found",
      description: "The neutral profile you're looking for could not be found.",
    })
  }
  return createMetadata({
    title: neutral.title,
    description: neutral.short_bio || `Learn more about ${neutral.title}, a FAIR Sports neutral.`,
    path: `/neutrals/${neutral.slug}`,
    image: neutral.photo,
  })
}

export default async function NeutralPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const neutral = await getNeutralBySlug(slug)
  if (!neutral) notFound()

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="text-navy hover:text-accord">
            <Link href="/neutrals" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Neutrals
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              <div className="flex-shrink-0 mx-auto lg:mx-0">
                <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={neutral!.photo || "/placeholder.svg?height=300&width=300&query=neutral-photo"}
                    alt={neutral!.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 224px, 224px"
                  />
                  <div className="absolute -inset-1 bg-gradient-to-r from-sky via-accord to-navy rounded-2xl opacity-0 hover:opacity-20 transition-opacity duration-300 -z-10" />
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-black text-ink mb-6 tracking-tight">{neutral!.title}</h1>
                {neutral!.tags && neutral!.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                    {neutral!.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-navy/10 text-navy rounded-lg border-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                {neutral!.short_bio && (
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">{neutral!.short_bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {neutral!.body && neutral!.body.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div
              className="prose prose-lg max-w-none prose-headings:text-navy prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-accord prose-a:no-underline hover:prose-a:underline prose-ul:text-gray-700 prose-li:text-gray-700"
              dangerouslySetInnerHTML={{ __html: renderNotionBlocks(neutral!.body) }}
            />
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-navy to-accord rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Work with {neutral!.title.split(" ")[0]}</h2>
            <p className="text-lg mb-6 opacity-90">
              Ready to resolve your dispute with expert guidance? Contact us to discuss your case.
            </p>
            <Button size="lg" className="bg-white text-navy hover:bg-gray-100 px-8 py-3 rounded-xl font-bold">
              <Link href="/contact">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

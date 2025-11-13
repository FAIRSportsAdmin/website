import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function BlogPreview() {
  return (
    <section className="py-20 bg-white-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">Insights</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Analysis and thought leadership on dispute resolution in sports and beyond
          </p>
        </div>

        <div className="text-center bg-gray-50 rounded-lg p-12">
          <h3 className="text-2xl font-bold text-navy mb-4">Coming Soon</h3>
          <p className="text-gray-600 mb-6">
            Our insights content is currently being prepared. Check back soon for the latest articles on sports dispute
            resolution.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-navy text-navy hover:bg-navy hover:text-white bg-transparent px-8 py-3 rounded-lg font-bold text-lg"
          >
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

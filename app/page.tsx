import { HeroFinal } from "@/components/hero-final"
import { RotatingTextSection } from "@/components/rotating-text-section"
import { SolutionsRefined } from "@/components/solutions-refined"
import { CtaStripFinal } from "@/components/cta-strip-final"
import { BlogPreview } from "@/components/blog-preview"
import { Suspense } from "react"
import { BlogPreviewSkeleton } from "@/components/blog-preview-skeleton"

export default function HomePage() {
  return (
    <>
      <HeroFinal />
      <RotatingTextSection />
      <SolutionsRefined />
      <CtaStripFinal />
      <Suspense fallback={<BlogPreviewSkeleton />}>
        {/* Blog preview streams in; skeleton reserves space to prevent layout shift */}
        <BlogPreview />
      </Suspense>
    </>
  )
}

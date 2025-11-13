import { createMetadata } from "@/lib/metadata"
import ContactPageClient from "./ContactPageClient"

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Ready to resolve your dispute? Get in touch with our team of experts. Contact FAIR Sports for fast and fair dispute resolution services.",
  path: "/contact",
})

export default function ContactPage() {
  return <ContactPageClient />
}

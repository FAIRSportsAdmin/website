import type { Metadata } from "next"
import FAQClientPage from "./FAQClientPage"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | FAIR Sports",
  description: "Get answers to common questions about FAIR Sports dispute resolution services for college athletics.",
}

export default function FAQPage() {
  return <FAQClientPage />
}

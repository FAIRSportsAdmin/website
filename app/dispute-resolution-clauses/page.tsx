import { createMetadata } from "@/lib/metadata"
import ClauseBuilderClientPage from "./ClauseBuilderClientPage"

export const metadata = createMetadata({
  title: "Dispute Resolution Clauses", // Updated title from Terms & Templates
  description:
    "Standard arbitration and mediation clauses for college sports contracts. Copy and paste legal language from FAIR Sports experts.",
  path: "/dispute-resolution-clauses", // Updated path from /clause-builder to /dispute-resolution-clauses
})

export default function ClauseBuilderPage() {
  return <ClauseBuilderClientPage />
}

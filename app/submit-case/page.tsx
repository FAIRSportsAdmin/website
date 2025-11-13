import type { Metadata } from "next"
import SubmitCaseClientPage from "./SubmitCaseClientPage"

export const metadata: Metadata = {
  title: "Submit a Case - FAIR Sports",
  description:
    "Submit your dispute to FAIR for fast, fair resolution through our standard submission agreement process.",
}

export default function SubmitCasePage() {
  return <SubmitCaseClientPage />
}

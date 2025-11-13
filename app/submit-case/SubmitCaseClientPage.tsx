"use client"

import { PageLayout } from "@/components/layout/page-layout"
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SubmitCaseClientPage() {
  const [copiedState, setCopiedState] = useState<{ [key: string]: boolean }>({})

  const copyToClipboard = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedState((prev) => ({ ...prev, [key]: true }))
    setTimeout(() => {
      setCopiedState((prev) => ({ ...prev, [key]: false }))
    }, 2000)
  }

  const submissionText = `We, the undersigned parties, hereby agree to submit to arbitration administered by the Forum of Arbitration and Independent Resolution in Sports ("FAIR") under its Arbitration Rules and Procedures the following controversy: (describe briefly). We further agree that the above controversy will be submitted to (one or three) arbitrator(s) through FAIR. We further agree that we will faithfully observe this agreement and the FAIR rules, that we will abide by and perform any award rendered by the arbitrator(s), and that a judgment of any court having jurisdiction may be entered on the award.`

  const waiverText = `The [State/Entity] hereby unconditionally and irrevocably waives its sovereign immunity and agrees to submit to arbitration administered by the Forum of Arbitration and Independent Resolution in Sports ("FAIR") under its Arbitration Rules and Procedures. This waiver includes immunity from legal proceedings, immunity from jurisdiction, and immunity from execution against its property.`

  return (
    <PageLayout
      title={
        <h1 className="font-black text-ink tracking-tight leading-tight font-[900] text-3xl md:text-4xl lg:text-5xl">
          Start Your Case
        </h1>
      }
      background="gray-50"
    >
      <div className="mb-16">
        {/* Case Portal Button Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center mb-12">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-lg">
            Access the FAIR case portal and use the submission language below to begin your resolution.
          </p>
          <Button asChild size="lg" className="px-8 py-3 text-lg font-semibold">
            <Link href="/portal" target="_blank" rel="noopener noreferrer">
              Access Case Portal
            </Link>
          </Button>
        </div>

        {/* Standard Submission Agreement */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 relative mb-12">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-semibold text-navy">Standard Submission Agreement</h3>
            <button
              onClick={() => copyToClipboard(submissionText, "submission")}
              className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Copy agreement to clipboard"
            >
              {copiedState.submission ? (
                <>
                  <CheckIcon className="w-5 h-5 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <ClipboardDocumentIcon className="w-5 h-5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-300">
            <p className="text-gray-800 leading-relaxed">
              We, the undersigned parties, hereby agree to submit to arbitration administered by the Forum of
              Arbitration and Independent Resolution in Sports ("FAIR") under its Arbitration Rules and Procedures the
              following controversy: (describe briefly). We further agree that the above controversy will be submitted
              to (one or three) arbitrator(s) through FAIR. We further agree that we will faithfully observe this
              agreement and the FAIR rules, that we will abide by and perform any award rendered by the arbitrator(s),
              and that a judgment of any court having jurisdiction may be entered on the award.
            </p>
          </div>
        </div>

        {/* Standard Waiver of Sovereign Immunity */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 relative mb-12">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-semibold text-navy">Standard Waiver of Sovereign Immunity</h3>
            <button
              onClick={() => copyToClipboard(waiverText, "waiver")}
              className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Copy waiver to clipboard"
            >
              {copiedState.waiver ? (
                <>
                  <CheckIcon className="w-5 h-5 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <ClipboardDocumentIcon className="w-5 h-5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-300">
            <p className="text-gray-800 leading-relaxed">
              The [State/Entity] hereby unconditionally and irrevocably waives its sovereign immunity and agrees to
              submit to arbitration administered by the Forum of Arbitration and Independent Resolution in Sports
              ("FAIR") under its Arbitration Rules and Procedures. This waiver includes immunity from legal proceedings,
              immunity from jurisdiction, and immunity from execution against its property.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

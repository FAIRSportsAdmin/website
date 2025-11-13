"use client"

import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

export default function ClauseBuilderClientPage() {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({})

  const copyToClipboard = async (text: string, clauseId: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedStates((prev) => ({ ...prev, [clauseId]: true }))
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [clauseId]: false }))
    }, 2000)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - 100 // 100px offset to keep heading visible

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <PageLayout title="Dispute Resolution Clauses" background="gray-50">
      <div className="mb-12">
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="relative group">
            <Button
              onClick={() => scrollToSection("arbitration-clauses")}
              variant="outline"
              className="px-6 py-3 hover:bg-[#63CBFD] hover:text-gray-900 hover:border-[#63CBFD]"
            >
              Arbitration Clauses
            </Button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white text-gray-900 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-lg">
              Parties can agree to submit future disputes to FAIR by inserting one of the following clauses into their
              contracts.
            </div>
          </div>
          <div className="relative group">
            <Button
              onClick={() => scrollToSection("mediation-clause")}
              variant="outline"
              className="px-6 py-3 hover:bg-[#63CBFD] hover:text-gray-900 hover:border-[#63CBFD]"
            >
              Mediation Clause
            </Button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white text-gray-900 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-lg">
              Parties can agree to submit future disputes to FAIR for mediation by inserting the following clause into
              their contracts.
            </div>
          </div>
        </div>
      </div>

      <div id="arbitration-clauses" className="mb-8">
        {/* Simple Neutral Arbitration Clause */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8 relative">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-semibold text-navy">Simple Neutral Arbitration Clause</h3>
            <button
              onClick={() =>
                copyToClipboard(
                  'Any dispute, controversy or claim arising out of or relating to this agreement, or the breach, termination, enforcement, interpretation or validity thereof, including the determination of the scope or applicability of this agreement to arbitrate, will be determined by arbitration administered by the Forum of Arbitration and Independent Resolution in Sports ("FAIR") under its Arbitration Rules and Procedures. Judgment on the award made by the arbitrator(s) may be entered in any court having jurisdiction.',
                  "simple",
                )
              }
              className="flex items-center gap-2 px-4 py-3 text-base text-gray-600 hover:text-gray-900 hover:bg-[#63CBFD] rounded-lg transition-colors"
              title="Copy clause to clipboard"
            >
              {copiedStates.simple ? (
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
              Any dispute, controversy or claim arising out of or relating to this agreement, or the breach,
              termination, enforcement, interpretation or validity thereof, including the determination of the scope or
              applicability of this agreement to arbitrate, will be determined by arbitration administered by the Forum
              of Arbitration and Independent Resolution in Sports ("FAIR") under its Arbitration Rules and Procedures.
              Judgment on the award made by the arbitrator(s) may be entered in any court having jurisdiction.
            </p>
          </div>
        </div>

        {/* Expanded Neutral Arbitration Clause */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8 relative">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-semibold text-navy">Expanded Neutral Arbitration Clause</h3>
            <button
              onClick={() =>
                copyToClipboard(
                  'Any dispute, controversy or claim arising out of or relating to this Agreement or the breach, termination, enforcement, interpretation or validity thereof, including the determination of the scope or applicability of this agreement to mediate and arbitrate (each, a "Dispute" and collectively, the "Disputes"), shall be resolved as follows:\n\nFirst, the Parties shall have fourteen (14) days to negotiate an agreeable solution in good faith, commencing the day a Party receives written notice of a Dispute.\n\nSecond, if the Parties do not reach an agreeable solution within such period, all Disputes shall be submitted for resolution on an expedited basis by confidential and non-binding mediation administered by the Forum of Arbitration and Independent Resolution in Sports ("FAIR") under its Mediation Rules and Procedures before a single mediator. The mediation shall take place no later than twenty-one (21) days from submission of the Dispute(s) to FAIR. The commencement and completion of mediation proceedings is a condition precedent to commencement of an arbitration hereunder unless otherwise agreed.\n\nLastly, if mediation does not produce an agreeable solution, all Disputes shall be submitted for resolution on an expedited basis by confidential and binding arbitration before a single arbitrator administered by FAIR under its Arbitration Rules and Procedures (the "Arbitration Rules"). Judgment on the award made by the arbitrator(s) may be entered in any court having jurisdiction.\n\nThe Parties knowingly and voluntarily consent to the waiver of any rights resulting from this dispute resolution provision or application of the Arbitration Rules. The Parties agree that the process set forth in this Section shall be the sole and exclusive process for resolving Disputes. In the event a Party initiates litigation in violation of this Section, such action shall be subject to dismissal, with the reasonable fees and expenses of the non-initiating Party or Par... <truncated>',
                  "expanded",
                )
              }
              className="flex items-center gap-2 px-4 py-3 text-base text-gray-600 hover:text-gray-900 hover:bg-[#63CBFD] rounded-lg transition-colors"
              title="Copy clause to clipboard"
            >
              {copiedStates.expanded ? (
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
            <p className="text-gray-800 leading-relaxed mb-4">
              Any dispute, controversy or claim arising out of or relating to this Agreement or the breach, termination,
              enforcement, interpretation or validity thereof, including the determination of the scope or applicability
              of this agreement to mediate and arbitrate (each, a "Dispute" and collectively, the "Disputes"), shall be
              resolved as follows:
            </p>
            <p className="text-gray-800 leading-relaxed mb-4">
              First, the Parties shall have fourteen (14) days to negotiate an agreeable solution in good faith,
              commencing the day a Party receives written notice of a Dispute.
            </p>
            <p className="text-gray-800 leading-relaxed mb-4">
              Second, if the Parties do not reach an agreeable solution within such period, all Disputes shall be
              submitted for resolution on an expedited basis by confidential and non-binding mediation administered by
              the Forum of Arbitration and Independent Resolution in Sports ("FAIR") under its Mediation Rules and
              Procedures before a single mediator. The mediation shall take place no later than twenty-one (21) days
              from submission of the Dispute(s) to FAIR. The commencement and completion of mediation proceedings is a
              condition precedent to commencement of an arbitration hereunder unless otherwise agreed.
            </p>
            <p className="text-gray-800 leading-relaxed mb-4">
              Lastly, if mediation does not produce an agreeable solution, all Disputes shall be submitted for
              resolution on an expedited basis by confidential and binding arbitration before a single arbitrator
              administered by FAIR under its Arbitration Rules and Procedures (the "Arbitration Rules"). Judgment on the
              award made by the arbitrator(s) may be entered in any court having jurisdiction.
            </p>
            <p className="text-gray-800 leading-relaxed">
              The Parties knowingly and voluntarily consent to the waiver of any rights resulting from this dispute
              resolution provision or application of the Arbitration Rules. The Parties agree that the process set forth
              in this Section shall be the sole and exclusive process for resolving Disputes. In the event a Party
              initiates litigation in violation of this Section, such action shall be subject to dismissal, with the
              reasonable fees and expenses of the non-initiating Party or Parties paid by the Party or Parties that
              initiated the action. Nothing in this Section shall limit the right of a Party to seek an order from a
              court of competent jurisdiction: (i) dismissing litigation brought in violation of this Section; or (ii)
              compelling a Party to mediate or arbitrate in accordance with this Section. Upon such order, the
              non-prevailing Party shall pay all reasonable fees and expenses of the prevailing Party with respect to
              such order. The Parties stipulate and agree that a violation of this dispute resolution provision shall
              constitute irreparable harm and that, on proof of a breach, the Party seeking relief from such violation
              shall be entitled to equitable relief including, but not limited to, an injunction or specific
              performance.
            </p>
          </div>
        </div>
      </div>

      <div id="mediation-clause" className="mb-16">
        <div className="bg-white rounded-xl border border-gray-200 p-8 relative">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-semibold text-navy">Mediation Clause</h3>
            <button
              onClick={() =>
                copyToClipboard(
                  'Prior to a Party\'s commencement of litigation or arbitration proceedings, any dispute, controversy or claim arising out of or relating to this Agreement or the breach, termination, enforcement, interpretation or validity thereof, including the determination of the scope or applicability of this agreement to mediate, shall first be submitted for resolution on an expedited basis by confidential and non-binding mediation administered by the Forum of Arbitration and Independent Resolution in Sports ("FAIR") under its Mediation Rules and Procedures before a single mediator. The mediation shall take place no later than twenty-one (21) days from submission of the dispute(s) to FAIR.',
                  "mediation",
                )
              }
              className="flex items-center gap-2 px-4 py-3 text-base text-gray-600 hover:text-gray-900 hover:bg-[#63CBFD] rounded-lg transition-colors"
              title="Copy clause to clipboard"
            >
              {copiedStates.mediation ? (
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
              Prior to a Party's commencement of litigation or arbitration proceedings, any dispute, controversy or
              claim arising out of or relating to this Agreement or the breach, termination, enforcement, interpretation
              or validity thereof, including the determination of the scope or applicability of this agreement to
              mediate, shall first be submitted for resolution on an expedited basis by confidential and non-binding
              mediation administered by the Forum of Arbitration and Independent Resolution in Sports ("FAIR") under its
              Mediation Rules and Procedures before a single mediator. The mediation shall take place no later than
              twenty-one (21) days from submission of the dispute(s) to FAIR.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

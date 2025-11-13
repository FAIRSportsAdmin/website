"use client"

import { useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "What is FAIR Sports?",
    answer:
      'FAIR Sports offers a neutral place to resolve disputes between parties in college sports. FAIR stands for the Forum of Arbitration and Independent Resolution. FAIR Sports is organized as a public benefit company with the stated purpose "to foster and promote independent dispute resolution amongst college sports stakeholders."',
  },
  {
    question: "What disputes will FAIR resolve?",
    answer:
      "Disputes include issues that would typically go to court, such as disagreements regarding revenue share, NIL contracts, scholarships, agent representation, deals with collectives and other third parties, and more. FAIR will resolve these matters more efficiently, at a fraction of the cost, and in a confidential forum. As college sports evolve, FAIR will handle other disputes, determinations, and appeals.",
  },
  {
    question: "Why is FAIR needed?",
    answer:
      "The stakes and complexity of college sports are higher than ever. More disputes are inevitable as the industry evolves. More court cases will continue to be costly, time-consuming, and destabilizing. Neutral arbitration is faster, cheaper, and confidential. FAIR is dedicated exclusively to college sports to promote consistency and stability.",
  },
  {
    question: "Who decides the cases?",
    answer:
      "FAIR arbitrators are neutral decision-makers with a deep understanding of college sports. They have testified before Congress, overseen complex sports matters, written leading sports law textbooks, studied and taught dispute resolution, and are regularly cited as authorities on the shifting college sports legal and regulatory landscape. The diversity and experience of our arbitrators are second to none.",
  },
  {
    question: "Is FAIR independent?",
    answer:
      "Yes, FAIR is an independent public benefit company that includes neutral arbitrators who have an obligation to resolve disputes without bias. Our arbitrators have a long record of overseeing fair outcomes on a variety of sports legal disputes.",
  },
  {
    question: "Where are cases heard?",
    answer:
      "Hearings and pre-hearing conferences are held virtually unless the parties agree otherwise. All proceedings are confidential and will not be transcribed or recorded unless the parties agree differently.",
  },
  {
    question: "How much does it cost?",
    answer:
      "FAIR offers affordable and accessible dispute resolution at lower costs than other forums, particularly courts. Parties pay an administrative fee to initiate a case and typically share the cost of arbitrators, who work at reasonable hourly rates. Virtual hearings and streamlined procedures keep the costs low. Costs are split by the parties to a dispute unless otherwise agreed or ordered.",
  },
  {
    question: "Will FAIR arbitrate issues related to the House settlement?",
    answer:
      "Parties to the House settlement will designate arbitrators to resolve specific disputes that may arise under the settlement agreement. FAIR arbitrators are exceptionally suited to resolve such disputes given their backgrounds and experience arbitrating important sports matters.",
  },
  {
    question: "How many disputes does FAIR expect to address?",
    answer:
      "If 200 college athletes at each of the top 100 universities execute two contracts each (scholarship + revenue share/NIL agreement), and only 1% result in disputes, 400 cases will require resolution every year. These calculations exclude contracts with collectives and other third parties. The stakes are higher than ever, and new transactions add a layer of complexity to an already challenging legal and regulatory environment. Disputes are inevitable, and college sports will benefit from a forum dedicated to these matters.",
  },
  {
    question: "How do parties utilize FAIR?",
    answer:
      "Parties can add a dispute resolution clause to their contracts naming FAIR as the place to handle their disputes. Schools can also update their policies to name FAIR to resolve scholarship appeals. Indeed, parties can agree to submit their disputes to FAIR at any point before an order or determination by another adjudicative body (e.g., a court).",
  },
  {
    question: "How do the cases work?",
    answer:
      "Once parties submit their dispute to FAIR, cases are governed by FAIR's unique rules, designed to address college sports matters quickly and fairly. Parties can agree to modify the rules for a particular dispute, but most cases will follow FAIR's standard procedural rules.",
  },
  {
    question: "Why shouldn't parties just take their case to court?",
    answer:
      "Arbitration is faster and more affordable than court, which is why it is used by most sports leagues. All FAIR proceedings are confidential and overseen by neutral arbitrators who understand the complicated landscape of college sports.",
  },
  {
    question: "Who is leading FAIR?",
    answer:
      "FAIR advisors and leadership have many decades of combined experience in college sports, including as athletes, coaches, athletic directors, NCAA officials, sports attorneys, sports law professors, and more. Our team has been on all sides of some of the most defining matters in modern college sports.",
  },
]

function FAQAccordion({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-6 px-0 text-left flex justify-between items-start gap-4 hover:bg-gray-50/50 transition-colors duration-200 focus:outline-none focus:bg-gray-50/50"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">{item.question}</h3>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 mt-1 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-6 px-0">
          <p className="text-gray-600 leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about FAIR Sports dispute resolution services for college athletics.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white">
          {faqData.map((item, index) => (
            <FAQAccordion key={index} item={item} isOpen={openItems.has(index)} onToggle={() => toggleItem(index)} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our team is here to help you understand how FAIR Sports can resolve your dispute efficiently and
            confidentially.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-[#0A2342] text-white font-semibold rounded-lg hover:bg-[#0A2342]/90 transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}

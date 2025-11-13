"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FaqItem {
  question: string
  answer: string
}

interface FaqAccordionProps {
  faqs: FaqItem[]
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-3">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="bg-white rounded-lg shadow-sm border border-gray-200/80"
        >
          <AccordionTrigger className="text-left font-semibold text-foreground px-6 py-4 hover:no-underline text-base">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-5">
            <p className="text-gray-600 leading-relaxed text-sm">{faq.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

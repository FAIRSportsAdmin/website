export interface ServiceStep {
  name: string
  iconKey: string
  description: string
}

export interface ServicePageData {
  slug: "negotiation" | "mediation" | "arbitration"
  name: string
  valueProp: string
  process: {
    title: string
    steps: ServiceStep[]
  }
  useCases: {
    title: string
    cases: string[]
  }
  faqs: {
    title: string
    items: { question: string; answer: string }[]
  }
}

export const solutionsContent: Record<"negotiation" | "mediation" | "arbitration", ServicePageData> = {
  negotiation: {
    slug: "negotiation",
    name: "Confidential Ombuds",
    valueProp:
      "Confidential dialogue facilitated by a trusted intermediary to build common ground and support fair outcomes without formal proceedings.",
    process: {
      title: "The Ombuds Process",
      steps: [
        {
          name: "Initial Consultation",
          iconKey: "ClipboardEdit",
          description: "A confidential discussion to understand the core issues and goals.",
        },
        {
          name: "Guided Dialogue",
          iconKey: "Speech",
          description: "Facilitated conversations focused on mutual understanding and common ground.",
        },
        {
          name: "Consensus Building",
          iconKey: "UsersRound",
          description: "Identifying constructive solutions and equitable outcomes without pressure or judgment.",
        },
        {
          name: "Collaborative Resolution",
          iconKey: "Award",
          description: "A mutually acceptable outcome that preserves relationships, reputations, and opportunities.",
        },
      ],
    },
    useCases: {
      title: "When to seek Ombuds support:",
      cases: [
        "When an independent voice can help prevent escalation of a budding dispute.",
        "When preserving relationships and reputations requires a trusted intermediary.",
        "When communication has broken down and confidential, guided dialogue can restore understanding.",
        "When a conflict requires resolution but does not merit litigation.",
      ],
    },
    faqs: {
      title: "Ombuds FAQ",
      items: [
        {
          question: "Are conversations with the Ombuds staff confidential?",
          answer: "Yes. All communications with the Ombuds are confidential to encourage open and honest dialogue.",
        },
        {
          question: "Is the outcome of the Ombuds process binding?",
          answer:
            "No. The Ombuds staff facilitates conversation to help parties reach a resolution. If successful, the parties may choose to reflect the resolution in a written agreement.",
        },
        {
          question: "Who can use the Ombuds process?",
          answer:
            "The Ombuds process is available to all parties involved in college sports disputes, including athletes, coaches, administrators, and institutions.",
        },
      ],
    },
  },
  mediation: {
    slug: "mediation",
    name: "Mediation",
    valueProp:
      "Confidential discussions guided by trained and trusted sports mediators to resolve disputes without litigation.",
    process: {
      title: "The Mediation Process",
      steps: [
        {
          name: "Agreement to Mediate",
          iconKey: "HelpingHand",
          description: "Parties agree to mediate and submit the matter to FAIR",
        },
        {
          name: "Mediator Selection",
          iconKey: "UserCheck",
          description: "Parties choose from FAIR's roster of experienced sports mediators.",
        },
        {
          name: "Facilitated Discussion",
          iconKey: "UsersRound",
          description:
            "The mediator guides a structured, confidential discussion to find common ground and move toward resolution.",
        },
        {
          name: "Settlement Agreement",
          iconKey: "FileSignature",
          description:
            "If successful, the parties enter into a confidential settlement agreement that reflects their resolution.",
        },
      ],
    },
    useCases: {
      title: "When to Choose Mediation",
      cases: [
        "When a dispute has escalated beyond informal conversations but does not require litigation.",
        "When parties prefer to shape their own resolution rather than rely on outside decision-makers.",
        "When confidentiality is essential to resolving sensitive issues.",
        "When preserving ongoing relationships benefits from collaborative dialogue.",
      ],
    },
    faqs: {
      title: "Mediation FAQs",
      items: [
        {
          question: "What is the difference between mediation and arbitration?",
          answer:
            "In mediation, a neutral third party facilitates a settlement between the parties, but does not impose a decision. The parties control the outcome. In arbitration, the neutral arbitrator hears evidence and makes a final, binding decision.",
        },
        {
          question: "Is mediation confidential?",
          answer:
            "Yes, mediation is a confidential process. What is said during mediation cannot be used in later legal proceedings, which encourages open discussion.",
        },
        {
          question: "What happens if we don't reach an agreement in mediation?",
          answer:
            "If an agreement is not reached, the parties are free to pursue other options, such as arbitration or litigation, as if the mediation never occurred. You do not lose any rights by attempting mediation first.",
        },
      ],
    },
  },
  arbitration: {
    slug: "arbitration",
    name: "Streamlined Arbitration",
    valueProp:
      "A confidential, streamlined process with virtual hearings led by top sports arbitrators trained in college athletics.",
    process: {
      title: "The Arbitration Process",
      steps: [
        {
          name: "Case Filing & Submission",
          iconKey: "FileText",
          description: "A formal demand for arbitration is filed with FAIR, initiating the process.",
        },
        {
          name: "Arbitrator Selection",
          iconKey: "UserCheck",
          description: "Parties choose from FAIR's roster of experienced sports arbitrators.",
        },
        {
          name: "Discovery & Briefing",
          iconKey: "FolderSearch",
          description: "Parties exchange information and submit legal briefs to the arbitrator.",
        },
        {
          name: "Virtual Hearing",
          iconKey: "Gavel",
          description: "Parties participate in a formal hearing via FAIR's virtual hearing platform.",
        },
        {
          name: "Final & Binding Award",
          iconKey: "Award",
          description: "The arbitrator issues a final and binding written award, resolving the dispute.",
        },
      ],
    },
    useCases: {
      title: "When to choose arbitration:",
      cases: [
        "When parties want a streamlined, confidential alternative to litigation.",
        "When specialized knowledge of college athletics is needed to resolve the issue.",
        "When mediation has failed and the parties require a resolution.",
      ],
    },
    faqs: {
      title: "FAQ:",
      items: [
        {
          question: "How is arbitration different from mediation?",
          answer:
            "In mediation, a neutral helps parties reach a voluntary agreement. In arbitration, a neutral arbitrator hears both sides and issues a binding decision that resolves the dispute. Both processes are confidential.",
        },
        {
          question: "How long does the arbitration process typically take?",
          answer:
            "While it depends on the complexity of the case, arbitration is significantly faster than litigation. FAIR's rules are designed for efficiency, with a target resolution of 90 days.",
        },
        {
          question: "Is the arbitrator's decision final?",
          answer:
            "Yes. Arbitration results in a binding and enforceable decision, providing closure and avoiding lengthy appeals or uncertainty.",
        },
      ],
    },
  },
}

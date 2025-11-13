import { PageLayout } from "@/components/layout/page-layout"
import { createMetadata } from "@/lib/metadata"
import { Shield, Users, Eye, Shuffle, Heart } from "lucide-react"

export const metadata = createMetadata({
  title: "Our Approach",
  description:
    "Learn about FAIR Sports' trauma-informed and restorative approach to dispute resolution in college athletics.",
  path: "/approach",
})

const coreElements = [
  {
    title: "Facilitator Impartiality",
    icon: Shield,
    description:
      "Our FAIR neutrals are independent and free from conflicts of interest. Parties can be confident that their concerns will be heard fairly and that any outcome or process reflects a balanced view of the issues rather than institutional bias.",
  },
  {
    title: "Collaborative",
    icon: Users,
    description:
      "Parties who feel invested in shaping the resolution are more likely to accept and adhere to it. We believe that individuals closest to a conflict often know best what they need to move forward, which leads to more meaningful and lasting outcomes.",
  },
  {
    title: "Transparent",
    icon: Eye,
    description:
      "While we maintain confidentiality where appropriate, we ensure that process steps, roles, and expectations are clearly communicated. Transparency about how decisions are reached builds trust and reduces perceptions of hidden agendas.",
  },
  {
    title: "Flexible",
    icon: Shuffle,
    description:
      "Every college sports dispute has its own context, culture, and set of stakeholders. FAIR processes adapt to the unique circumstances of each case, ensuring solutions are practical and culturally relevant to the people involved.",
  },
  {
    title: "Restorative",
    icon: Heart,
    description:
      "Where harm has been done, our focus extends beyond assigning blame. We aim to help parties understand the impact of their actions, take responsibility where appropriate, and work toward repairing relationships and communities. Restorative practices empower individuals to heal and grow from difficult experiences.",
  },
]

export default function ApproachPage() {
  return (
    <PageLayout title="Our Approach" description="Trauma-informed and restorative practices for college athletics.">
      <div className="max-w-4xl mx-auto">
        {/* Trauma-Informed & Restorative Approach Section */}
        <div className="bg-card-texture p-8 md:p-12 rounded-lg shadow-sm border border-gray-200/50 mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-6">Trauma-Informed & Restorative Approach</h2>
          <div className="prose prose-lg max-w-none space-y-4 text-gray-700">
            <p>
              At FAIR Sports, we recognize that college athletics disputes often arise in high-stress environments where
              emotions run deep and relationships matter. Athletes, coaches, administrators, and families may come to a
              conflict resolution process carrying past experiences of power imbalances, institutional mistrust, or
              personal harm. That's why we ground our work in trauma-informed and restorative principles.
            </p>
            <p>
              A{" "}
              <span className="font-semibold text-foreground">
                trauma-informed approach means we are sensitive to how past experiences
              </span>
              —whether related to injury, discrimination, abuse, or simply feeling unheard—can shape someone's ability
              to engage in a dispute resolution process. We design our procedures to minimize re-traumatization by
              creating safe, respectful spaces for dialogue, ensuring parties feel heard and valued rather than judged,
              and empowering participants with information and choices throughout the process.
            </p>
            <p>
              A <span className="font-semibold text-foreground">restorative philosophy</span> goes beyond merely
              determining who is "right" or "wrong." Instead, it asks: How can we understand the underlying needs and
              harms here? How can we facilitate accountability, healing, and relationship repair where possible? This
              means involving those affected by a conflict in shaping solutions, acknowledging the impact of actions on
              individuals and the community, and focusing on outcomes that restore dignity and trust.
            </p>
            <p>
              By integrating these principles, FAIR Sports aims to help college athletics stakeholders not only resolve
              immediate disputes but also strengthen the integrity and culture of their programs. We believe that how we
              handle conflict matters as much as the outcome itself—and that a process grounded in fairness, empathy,
              and respect can lead to more sustainable, positive change.
            </p>
          </div>
        </div>

        {/* Core Elements Section */}
        <div className="bg-card-texture p-8 md:p-12 rounded-lg shadow-sm border border-gray-200/50">
          <h2 className="text-3xl font-bold text-foreground mb-6">Core Elements of Our FAIR Process</h2>
          <p className="text-lg text-gray-700 mb-8">
            Our approach is defined by five key principles that ensure fairness, collaboration, and meaningful
            resolution:
          </p>

          <div className="space-y-6">
            {coreElements.map((element) => {
              const Icon = element.icon
              return (
                <div key={element.title} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-accord" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{element.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{element.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Video, BookOpen, Download, type LucideIcon } from "lucide-react"
import Link from "next/link"

const ICONS: Record<string, LucideIcon> = {
  FileText,
  Video,
  BookOpen,
  Download,
}

interface Category {
  iconKey: string
  title: string
  href: string
  description: string
  items: string[]
}

export function ResourceCategoryCard({ category }: { category: Category }) {
  const Icon = ICONS[category.iconKey]

  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-sky/10 rounded-lg flex items-center justify-center mr-4">
            {Icon && <Icon className="w-6 h-6 text-accord" />}
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-navy">
              <Link href={category.href} className="hover:underline">
                {category.title}
              </Link>
            </CardTitle>
            <CardDescription className="text-gray-600">{category.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <ul className="space-y-3 flex-grow">
          {category.items.map((item, itemIndex) => (
            <li key={itemIndex} className="flex items-center justify-between">
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
        <Button
          variant="outline"
          className="w-full mt-6 border-navy text-navy hover:bg-navy hover:text-white bg-transparent"
          asChild
        >
          <Link href={category.href}>View All</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

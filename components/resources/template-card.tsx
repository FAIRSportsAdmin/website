"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Shield, Clock, Users, Scale, type LucideIcon } from "lucide-react"

const ICONS: Record<string, LucideIcon> = {
  Download,
  FileText,
  Shield,
  Clock,
  Users,
  Scale,
}

interface Template {
  title: string
  description: string
  category: string
  iconKey: string
  fileType: string
  fileSize: string
  downloads: number
  lastUpdated: string
  difficulty: string
}

interface TemplateCardProps {
  template: Template
  featured?: boolean
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800"
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800"
    case "Advanced":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getFileTypeColor = (fileType: string) => {
  switch (fileType) {
    case "PDF":
      return "bg-red-100 text-red-800"
    case "DOCX":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function TemplateCard({ template, featured = false }: TemplateCardProps) {
  const Icon = ICONS[template.iconKey]

  if (featured) {
    return (
      <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accord/10 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5 text-accord" />
              </div>
              <Badge className="bg-accord/10 text-accord border-0 font-medium">{template.category}</Badge>
            </div>
            <div className="flex gap-2">
              <Badge className={`${getFileTypeColor(template.fileType)} border-0 text-xs font-medium`}>
                {template.fileType}
              </Badge>
              <Badge className={`${getDifficultyColor(template.difficulty)} border-0 text-xs font-medium`}>
                {template.difficulty}
              </Badge>
            </div>
          </div>
          <CardTitle className="text-xl font-bold text-navy leading-tight">{template.title}</CardTitle>
          <CardDescription className="text-gray-600 leading-relaxed">{template.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-4">
              <span>{template.fileSize}</span>
              <span>•</span>
              <span>{template.downloads.toLocaleString()} downloads</span>
            </div>
            <span>Updated {template.lastUpdated}</span>
          </div>

          <Button className="bg-navy hover:bg-ink text-white w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Template
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white shadow-md border-0 hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-sky/10 rounded-lg flex items-center justify-center">
            <Icon className="w-4 h-4 text-navy" />
          </div>
          <Badge className="bg-sky/10 text-navy border-0 text-xs font-medium">{template.category}</Badge>
        </div>
        <CardTitle className="text-lg font-bold text-navy leading-tight">{template.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">{template.description}</p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex gap-2">
            <Badge className={`${getFileTypeColor(template.fileType)} border-0 text-xs`}>{template.fileType}</Badge>
            <Badge className={`${getDifficultyColor(template.difficulty)} border-0 text-xs`}>
              {template.difficulty}
            </Badge>
          </div>
          <span>{template.fileSize}</span>
        </div>

        <div className="text-xs text-gray-500 mb-4">
          {template.downloads.toLocaleString()} downloads • {template.lastUpdated}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full border-navy text-navy hover:bg-navy hover:text-white bg-transparent"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </CardContent>
    </Card>
  )
}

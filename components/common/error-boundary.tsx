"use client"

import { Component, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
          <h3 className="text-xl font-bold text-navy mb-2">Something went wrong</h3>
          <p className="text-gray-600 text-center mb-6 max-w-md">
            We're having trouble loading this content. Please try refreshing the page.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-accord hover:bg-accord/90 text-white flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Page
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook version for functional components
export function ErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg">
      <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
      <h3 className="text-xl font-bold text-navy mb-2">Content Unavailable</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        We're having trouble connecting to our content service. Please try again in a moment.
      </p>
      <Button onClick={resetError} className="bg-accord hover:bg-accord/90 text-white flex items-center gap-2">
        <RefreshCw className="w-4 h-4" />
        Try Again
      </Button>
    </div>
  )
}

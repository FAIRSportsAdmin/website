import { ArrowLeft } from 'lucide-react'

export default function Loading() {
  return (
    <div className="py-20 bg-gray-50 animate-pulse">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-gray-400">
            <ArrowLeft className="w-4 h-4" />
            <div className="h-5 w-24 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="h-6 w-1/3 bg-gray-200 rounded mb-4" />
        <div className="h-12 w-full bg-gray-300 rounded mb-2" />
        <div className="h-12 w-2/3 bg-gray-300 rounded mb-6" />
        <div className="h-6 w-1/2 bg-gray-200 rounded mb-8" />
        <div className="aspect-video rounded-2xl bg-gray-200 mb-8" />
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <div className="space-y-4">
            <div className="h-5 w-full bg-gray-200 rounded" />
            <div className="h-5 w-full bg-gray-200 rounded" />
            <div className="h-5 w-5/6 bg-gray-200 rounded" />
            <div className="h-5 w-full bg-gray-200 rounded mt-6" />
            <div className="h-5 w-2/3 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

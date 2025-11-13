import { ArrowLeft } from 'lucide-react'

export default function Loading() {
  return (
    <div className="py-20 bg-gray-50 animate-pulse">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-gray-400">
            <ArrowLeft className="w-4 h-4" />
            <div className="h-5 w-48 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mb-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-2xl bg-gray-200 flex-shrink-0" />
            <div className="flex-1 mt-4 lg:mt-0">
              <div className="h-10 w-3/4 bg-gray-300 rounded mb-6" />
              <div className="h-6 w-1/3 bg-gray-200 rounded mb-6" />
              <div className="space-y-3">
                <div className="h-5 w-full bg-gray-200 rounded" />
                <div className="h-5 w-full bg-gray-200 rounded" />
                <div className="h-5 w-5/6 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <div className="space-y-4">
            <div className="h-5 w-full bg-gray-200 rounded" />
            <div className="h-5 w-full bg-gray-200 rounded" />
            <div className="h-5 w-5/6 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

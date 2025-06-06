"use client"

import { BarChart3 } from "lucide-react"
import type { Column } from "@/types"

interface AnalyticsViewProps {
  columns: Column[]
}

export default function AnalyticsView({ columns }: AnalyticsViewProps) {
  const allItems = columns.flatMap((col) => col.items)

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-8 text-center">
          <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics View</h3>
          <p className="text-gray-500 mb-4">Track performance metrics and engagement across all your content</p>
          <p className="text-sm text-gray-400">{allItems.length} items tracked</p>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Eye } from "lucide-react"
import type { PreviewViewProps } from "@/types/preview-view"

export default function PreviewView({ columns }: PreviewViewProps) {
  const allItems = columns.flatMap((col) => col.items)

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-8 text-center">
          <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Preview View</h3>
          <p className="text-gray-500 mb-4">Preview how your content will look on different social platforms</p>
          <p className="text-sm text-gray-400">{allItems.length} items ready for preview</p>
        </div>
      </div>
    </div>
  )
}

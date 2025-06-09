"use client"

import { Rss } from "lucide-react"
import type { FeedViewProps } from "@/types"

export default function FeedView({ columns }: FeedViewProps) {
  const allItems = columns.flatMap((col) => col.items)

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-8 text-center">
          <Rss className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Feed View</h3>
          <p className="text-gray-500 mb-4">View your content as a social media feed to see how it flows together</p>
          <p className="text-sm text-gray-400">{allItems.length} items in feed</p>
        </div>
      </div>
    </div>
  )
}

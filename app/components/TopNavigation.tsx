"use client"

import { Settings, Share, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TopNavigationProps {
  currentView: string
  onViewChange: (view: string) => void
  onAddContent: () => void
  selectedFilters: string[]
  onFiltersChange: (filters: string[]) => void
}

const views = [
  { id: "Calendar", label: "Calendar", icon: "📅" },
  { id: "Board", label: "Board", icon: "📋" },
  { id: "Table", label: "Table", icon: "📊" },
  { id: "Preview", label: "Preview", icon: "👁️" },
  { id: "Feed", label: "Feed", icon: "📱" },
  { id: "Analytics", label: "Analytics", icon: "📈" },
]

export default function TopNavigation({
  currentView,
  onViewChange,
  onAddContent,
  selectedFilters,
  onFiltersChange,
}: TopNavigationProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-lg">🎯</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Beyond UI</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button onClick={onAddContent} className="bg-blue-600 hover:bg-blue-700">
            Add Content
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center border-b border-transparent">
          {views.map((view) => (
            <Button
              key={view.id}
              variant="ghost"
              size="sm"
              onClick={() => onViewChange(view.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-none transition-all border-b-2",
                currentView === view.id
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 hover:text-gray-900 border-transparent",
              )}
            >
              <span className="mr-2">{view.icon}</span>
              {view.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {selectedFilters.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedFilters.length}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

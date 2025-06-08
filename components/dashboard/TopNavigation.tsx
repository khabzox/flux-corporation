"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Icon from "@/lib/IconLibrary"
import { cn } from "@/lib/utils"

interface TopNavigationProps {
  currentView: string
  onViewChange: (view: string) => void
  onAddContent: () => void
  selectedFilters: string[]
  onFiltersChange: (filters: string[]) => void
}

const views = [
  { id: "Calendar", label: "Calendar", icon: <Icon name="calendar" className="w-4 h-4" /> },
  { id: "Board", label: "Board", icon: <Icon name="board" className="w-4 h-4" /> },
  { id: "Table", label: "Table", icon: <Icon name="table" className="w-4 h-4" /> },
  { id: "Preview", label: "Preview", icon: <Icon name="preview" className="w-4 h-4" /> },
  { id: "Feed", label: "Feed", icon: <Icon name="feed" className="w-4 h-4" /> },
  { id: "Analytics", label: "Analytics", icon: <Icon name="analytics" className="w-4 h-4" /> },
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
            <Icon name="layout" className="w-4 h-4" />
          </div>
          <h1 className="text-xl font-semibold">Beyond UI</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Icon name="settings" className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            Share
          </Button>
          <Button  onClick={onAddContent} className="h-[36px] w-[117px] bg-blue-600 hover:bg-blue-600/90">
            Add Content
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-start">
        <div className="flex items-center border-b">
          {views.map((view) => (
            <Button
              key={view.id}
              variant="ghost"
              size="sm"
              onClick={() => onViewChange(view.id)}
              className={cn(
                "px-4 py-2 text-base font-medium rounded-none transition-all border-b-2",
                currentView === view.id
                  ? "text-[#141C25] border-[#141C25]"
                  : "text-gray-600 hover:text-gray-900 border-transparent",
              )}
            >
              <span className="mr-2">{view.icon}</span>
              {view.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-4">
          <Button variant="outline" size="sm" className="border h-7">
            <Icon name="filter" className="w-4 h-4 mr-2" />
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

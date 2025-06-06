"use client"

import { Search, Inbox, Plus, ChevronDown, AlertTriangle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function Sidebar({ searchQuery, onSearchChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Company Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">F</span>
          </div>
          <span className="font-semibold text-gray-900">Flux Corporation</span>
          <ChevronDown className="w-4 h-4 text-gray-500 ml-auto" />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
            <div className="w-4 h-4 mr-3" />
            My content
          </Button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-gray-50 border-0"
            />
          </div>

          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
            <Inbox className="w-4 h-4 mr-3" />
            Inbox
            <span className="ml-auto bg-blue-600 text-white text-xs px-2 py-1 rounded-full">3</span>
          </Button>
        </nav>

        {/* Social Spaces */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">Social Spaces</span>
            <Button size="sm" variant="ghost" className="w-6 h-6 p-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
              <div className="w-4 h-4 mr-3 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                B
              </div>
              Beyond UI
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
              <div className="w-4 h-4 mr-3 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
                M
              </div>
              Marketing
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
              <div className="w-4 h-4 mr-3 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">
                H
              </div>
              HR
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-orange-600 mb-4">
          <AlertTriangle className="w-4 h-4" />
          <span>7 days left in trial</span>
          <Button size="sm" variant="link" className="p-0 h-auto text-blue-600">
            Upgrade
          </Button>
        </div>

        <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100 mb-4">
          <HelpCircle className="w-4 h-4 mr-3" />
          Support
        </Button>

        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>AT</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900">Anna Taylor</div>
            <div className="text-xs text-gray-500 truncate">anna@email.com</div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  )
}

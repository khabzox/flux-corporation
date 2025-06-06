"use client"

import Icon from "@/lib/IconLibrary"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

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
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
            <Image src="/logo.png" alt="Flux Corporation" width={24} height={24} />
          </div>
          <span className="font-normal text-gray-900">Flux Corporation</span>
          <Icon name="chevronDown" className="w-4 h-4 text-gray-500 ml-auto" />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 pl-0.5">
        <nav className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <div className="w-4 h-4" ><Icon name="home" /></div>
            My content
          </Button>

          <Button variant="ghost" className="w-full justify-start">
            <div className="w-4 h-4" ><Icon name="search" /></div>
            Search
          </Button>

          <Button variant="ghost" className="w-full justify-start">
            <div className="w-4 h-4" ><Icon name="bell" /></div>
            Inbox
            <span className="ml-auto bg-[#E5F2FF] text-[#005CE5] text-xs px-[4.5px] py-0 rounded-full">3</span>
          </Button>
        </nav>

        {/* Social Spaces */}
        <div className="mt-6 pl-5">
          <div className="flex items-center justify-start gap-2 mb-3">
            <Icon name="chevronDown" className="w-3 h-3" />
            <span className="text-sm font-medium text-[#344051]">Social Spaces</span>
            <Button size="sm" variant="ghost" className="w-6 h-6 ml-auto pt-2">
              <Icon name="plus" className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-0.5">
            <Button variant="ghost" className="w-full justify-start">
              <div className="w-4 h-4 mr-3 bg-[#E5F2FF] rounded-full text-[#005CE5] text-sm flex items-center justify-center">
                B
              </div>
              Beyond UI
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <div className="w-4 h-4 mr-3 bg-[#E5F2FF] rounded text-[#005CE5] text-xs flex items-center justify-center">
                M
              </div>
              Marketing
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <div className="w-4 h-4 mr-3 bg-[#E5F2FF] rounded text-[#005CE5] text-xs flex items-center justify-center">
                H
              </div>
              HR
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-gray-200">
        <div className="flex items-center gap-2 text-sm text-orange-600 mb-4 border rounded-lg p-2">
          <Icon name="warningInfo" className="w-4 h-4 text-white" strokeWidth={0.5} />
          <span className="text-[#344051]">7 days left in trial</span>
          <Button size="sm" variant="link" className="p-0 h-auto text-[#005CE5]">
            Upgrade
          </Button>
        </div>

        <Button variant="ghost" className="w-full justify-start mb-4">
          <Icon name="support" className="w-4 h-4 mr-3" />
          Support
        </Button>

        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/anna.png?height=32&width=32" />
            <AvatarFallback>AT</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900">Anna Taylor</div>
            <div className="text-xs text-gray-500 truncate">anna@email.com</div>
          </div>
          <Icon name="arrowDowUp" className="w-4 h-4" />
        </div>
      </div>
    </div>
  )
}

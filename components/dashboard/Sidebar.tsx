"use client"

import Icon from "@/lib/IconLibrary"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { useState } from "react"

interface SidebarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function Sidebar({ searchQuery, onSearchChange }: SidebarProps) {
  const [isSocialSpacesOpen, setSocialSpacesOpen] = useState(true);
  const [isCompanyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("Flux Corporation"); // Track selected company

  const toggleSocialSpaces = () => {
    setSocialSpacesOpen((prev) => !prev);
  };

  // Company data with logos
  const companies = [
    {
      name: "Tech Corp", 
      logo: "/logo.png"
    },
    {
      name: "Design Studio",
      logo: "/logo.png" 
    },
    {
      name: "Innovate Labs",
      logo: "/logo.png"
    }
  ];

  const toggleCompanyDropdown = () => {
    setCompanyDropdownOpen(prev => !prev);
  };

  const selectCompany = (company: string) => {
    setSelectedCompany(company);
    setCompanyDropdownOpen(false);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Company Header */}
      <div className="p-4 border-b border-gray-200 relative">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={toggleCompanyDropdown}
        >
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
            <Image 
              src={companies.find(c => c.name === selectedCompany)?.logo || "/logo.png"} 
              alt={selectedCompany}
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="font-normal text-gray-900">{selectedCompany}</span>
          <Icon 
            name="chevronDown" 
            className={`w-4 h-4 text-gray-500 ml-auto transition-transform ${isCompanyDropdownOpen ? 'rotate-180' : ''}`} 
          />
        </div>

        {/* Company Dropdown */}
        {isCompanyDropdownOpen && (
          <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-md z-10 border border-gray-200 max-h-60 overflow-y-auto">
            {companies.map((company) => (
              <div 
                key={company.name}
                className={`px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-3 ${selectedCompany === company.name ? 'bg-blue-50' : ''}`}
                onClick={() => selectCompany(company.name)}
              >
                <div className="w-5 h-5 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
                <span className="text-sm">{company.name}</span>
                {selectedCompany === company.name && (
                  <Icon name="check" className="w-4 h-4 text-blue-500 ml-auto" />
                )}
              </div>
            ))}
          </div>
        )}
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
        <div className="mt-6 pl-5 cursor-pointer">
          <div className="flex items-center justify-start gap-2 mb-3" onClick={toggleSocialSpaces}> {/* Step 3: Toggle on click */}
            <Icon name="chevronDown" className={`w-3 h-3 ${isSocialSpacesOpen ? 'rotate-180' : ''}`} /> {/* Optional: Rotate icon */}
            <span className="text-sm font-medium text-[#344051]">Social Spaces</span>
            <Button size="sm" variant="ghost" className="w-6 h-6 ml-auto pt-2">
              <Icon name="plus" className="w-4 h-4" />
            </Button>
          </div>

          {isSocialSpacesOpen && ( // Step 4: Conditional rendering
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
          )}
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

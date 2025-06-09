"use client"

import { Clock } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import SocialPlatformIcons from "./SocialPlatformIcons"

import { cn } from "@/lib/utils"
import type { CalendarContentCardProps } from "@/types"


// Status color mapping
const statusColors = {
  idea: "bg-gray-100 border-gray-300",
  "in-progress": "bg-blue-50 border-blue-300",
  "review-ready": "bg-amber-50 border-amber-300",
  approved: "bg-green-50 border-green-300",
}

// Platform color mapping
const platformColorClasses = {
  instagram: "border-l-4 border-l-pink-500",
  tiktok: "border-l-4 border-l-black",
  facebook: "border-l-4 border-l-blue-600",
  linkedin: "border-l-4 border-l-blue-700",
  twitter: "border-l-4 border-l-blue-400",
}

export default function CalendarContentCard({ item, isCompact = false }: CalendarContentCardProps) {
  // Determine the primary platform for color coding
  const primaryPlatform = item.platforms[0] || "instagram"

  if (isCompact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                "px-1 py-0.5 text-xs rounded border truncate",
                statusColors[item.status],
                platformColorClasses[primaryPlatform as keyof typeof platformColorClasses],
              )}
            >
              {item.title}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="max-w-xs">
            <div className="space-y-1">
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-gray-500">{item.description}</p>
              <div className="flex items-center gap-1 text-xs">
                <Clock className="h-3 w-3" />
                <span>{item.scheduledTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <SocialPlatformIcons platforms={item.platforms} />
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <div
      className={cn(
        "p-3 rounded-md border mb-2",
        statusColors[item.status],
        platformColorClasses[primaryPlatform as keyof typeof platformColorClasses],
      )}
    >
      <div className="flex items-start gap-3">
        <img src={item.thumbnail || "/placeholder.svg"} alt={item.title} className="w-12 h-12 rounded object-cover" />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm">{item.title}</h4>
          <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{item.scheduledTime}</span>
            </div>

            <div className="flex items-center gap-2">
              <SocialPlatformIcons platforms={item.platforms} />
              <Avatar className="w-5 h-5">
                <AvatarImage src={item.assignee.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-[10px]">
                  {item.assignee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

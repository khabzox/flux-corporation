"use client"

import { Calendar, Clock, MessageCircle, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ContentItem } from "../types"
import SocialPlatformIcons from "./SocialPlatformIcons"

interface ContentCardProps {
  item: ContentItem
}

export default function ContentCard({ item }: ContentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <img
          src={item.thumbnail || "/placeholder.svg"}
          alt={item.title}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <Button size="sm" variant="ghost" className="w-6 h-6 p-0">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <h4 className="font-medium text-gray-900 mb-2">{item.title}</h4>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>{item.scheduledDate}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{item.scheduledTime}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <SocialPlatformIcons platforms={item.platforms} />
      </div>

      <div className="flex items-center justify-between">
        <Avatar className="w-6 h-6">
          <AvatarImage src={item.assignee.avatar || "/placeholder.svg"} />
          <AvatarFallback className="text-xs">
            {item.assignee.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MessageCircle className="w-3 h-3" />
          <span>{item.comments}</span>
        </div>
      </div>
    </div>
  )
}

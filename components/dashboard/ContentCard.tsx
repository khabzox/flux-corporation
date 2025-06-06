"use client"

import { Calendar, Clock, MoreHorizontal, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ContentItem, Platform } from "@/types"
import SocialPlatformIcons from "./SocialPlatformIcons"

interface ContentCardProps {
  item: ContentItem
}

export default function ContentCard({ item }: ContentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex items-center justify-start mb-3">
          <div className="relative">
            <img
              src={item.thumbnail || "/person.png"}
              alt={item.title}
              className="w-[262px] h-[105px] rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full ml-4">
          <h4 className="font-semibold text-gray-900">{item.title}</h4>

          <div className="space-y-2">
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
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={item.assignee.avatar || "/avatar.png"} />
            <AvatarFallback className="text-xs">
              {item.assignee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-700">{item.assignee.name}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm font-medium">0</span>
        </div>
      </div>
    </div>
  )
}
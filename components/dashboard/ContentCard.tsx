"use client"

import { useState } from "react"
import { Calendar, Clock, MoreHorizontal, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ContentItem, Platform } from "@/types"
import SocialPlatformIcons from "./SocialPlatformIcons"

interface ContentCardProps {
  item: ContentItem
  onEdit?: (updatedItem: ContentItem) => void
}

export default function ContentCard({ item, onEdit }: ContentCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(item.title)

  const handleTitleClick = () => {
    if (onEdit) {
      setIsEditing(true)
    }
  }

  const handleTitleSubmit = () => {
    if (onEdit) {
      onEdit({ ...item, title })
    }
    setIsEditing(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSubmit()
    } else if (e.key === 'Escape') {
      setTitle(item.title)
      setIsEditing(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex items-center justify-start mb-3">
          <div className="relative">
            <img
              src={item.thumbnail || "/person.png"}
              alt={item.title}
              className="w-[262px] h-[105px] rounded-lg object-cover object-top"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full ml-4">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleSubmit}
              onKeyDown={handleKeyPress}
              className="font-semibold text-gray-900 bg-transparent border-b border-blue-500 outline-none"
              autoFocus
            />
          ) : (
            <h4
              className={`font-semibold text-gray-900 ${onEdit ? 'cursor-pointer hover:text-blue-600 transition-colors' : ''}`}
              onClick={handleTitleClick}
            >
              {item.title}
            </h4>
          )}

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

          <div className="flex items-center gap-2">
            <SocialPlatformIcons platforms={item.platforms} />
          </div>
        </div>
      </div>

      <div className="flex border-t pt-3 items-center justify-between">
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
          <span className="text-sm font-medium">{item.comments || 0}</span>
        </div>
      </div>
    </div>
  )
}
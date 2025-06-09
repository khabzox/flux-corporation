"use client"

import Image from "next/image"
import { useState } from "react"

import { Calendar, Clock, MessageCircle } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SocialPlatformIcons from "./SocialPlatformIcons"


import type { ContentCardProps } from "@/types"


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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center justify-start">
        <div className="flex items-center justify-start mb-2">
          <div className="relative">
            <Image
              src={item.thumbnail || "/person.png"}
              alt={item.title}
              className="rounded-lg object-cover object-top"
              width={262}
              height={109}
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
              className="font-medium text-gray-900 bg-transparent border-b border-blue-500 outline-none"
              autoFocus
            />
          ) : (
            <h4
              className={`font-medium text-gray-900 ${onEdit ? 'cursor-pointer hover:text-blue-600 transition-colors' : ''}`}
              onClick={handleTitleClick}
            >
              {item.title}
            </h4>
          )}

          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 text-lg text-gray-500">
              <Calendar className="w-5 h-5" />
              <span>{item.scheduledDate}</span>
            </div>
            <div className="flex items-center gap-2 text-lg text-gray-500">
              <Clock className="w-5 h-5" />
              <span>{item.scheduledTime}</span>
            </div>

            <div className="flex items-center gap-2">
              <SocialPlatformIcons platforms={item.platforms} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex border-t pt-2 items-center justify-between">
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
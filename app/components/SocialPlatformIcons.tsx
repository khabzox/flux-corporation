"use client"

import type { Platform } from "../types"

interface SocialPlatformIconsProps {
  platforms: Platform[]
}

const platformIcons = {
  tiktok: "🎵",
  instagram: "📷",
  facebook: "👥",
  twitter: "🐦",
  linkedin: "💼",
}

const platformColors = {
  tiktok: "bg-black",
  instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
  facebook: "bg-blue-600",
  twitter: "bg-blue-400",
  linkedin: "bg-blue-700",
}

export default function SocialPlatformIcons({ platforms }: SocialPlatformIconsProps) {
  return (
    <div className="flex items-center gap-1">
      {platforms.map((platform) => (
        <div
          key={platform}
          className={`w-5 h-5 rounded text-white text-xs flex items-center justify-center ${platformColors[platform]}`}
          title={platform.charAt(0).toUpperCase() + platform.slice(1)}
        >
          <span className="text-[10px]">{platformIcons[platform]}</span>
        </div>
      ))}
    </div>
  )
}

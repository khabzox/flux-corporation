"use client"

import type { Platform } from "@/types"
import Image from "next/image"

interface SocialPlatformIconsProps {
  platforms: Platform[]
}

const platformIcons = {
  tiktok: <Image src="/social-media/tiktok.png" alt="TikTok" width={18} height={18} />,
  instagram: <Image src="/social-media/instagram.png" alt="Instagram" width={18} height={18} />,
  facebook: <Image src="/social-media/facebook.png" alt="Facebook" width={18} height={18} />,
  twitter: <Image src="/social-media/twitter.png" alt="Twitter" width={18} height={18} />,
  linkedin: <Image src="/social-media/linkedin.png" alt="LinkedIn" width={18} height={18} />,
}

export default function SocialPlatformIcons({ platforms }: SocialPlatformIconsProps) {
  return (
    <div className="flex items-center gap-1">
      {platforms.map((platform) => (
        <div
          key={platform}
          className="w-5 h-5 rounded text-white text-sm flex items-center justify-center"
          title={platform.charAt(0).toUpperCase() + platform.slice(1)}
        >
          <span className="text-[10px]">{platformIcons[platform]}</span>
        </div>
      ))}
    </div>
  )
}

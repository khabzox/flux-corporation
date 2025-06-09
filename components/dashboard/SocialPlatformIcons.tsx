"use client"

import Image from "next/image"
import type { SocialPlatformIconsProps } from "@/types"

const platformIcons = {
  tiktok: <Image src="/social-media/tiktok.png" alt="TikTok" width={20} height={20} />,
  instagram: <Image src="/social-media/instagram.png" alt="Instagram" width={20} height={20} />,
  facebook: <Image src="/social-media/facebook.png" alt="Facebook" width={20} height={20} />,
  twitter: <Image src="/social-media/twitter.png" alt="Twitter" width={20} height={20} />,
  linkedin: <Image src="/social-media/linkedin.png" alt="LinkedIn" width={20} height={20} />,
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
          <span className="">{platformIcons[platform]}</span>
        </div>
      ))}
    </div>
  )
}

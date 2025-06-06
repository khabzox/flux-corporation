export interface ContentItem {
  id: string
  title: string
  description: string
  thumbnail: string
  scheduledDate: string
  scheduledTime: string
  platforms: Platform[]
  assignee: {
    name: string
    avatar: string
  }
  comments: number
  status: "idea" | "in-progress" | "review-ready" | "approved"
}

export interface Column {
  id: string
  title: string
  items: ContentItem[]
}

export type Platform = "tiktok" | "instagram" | "facebook" | "twitter" | "linkedin"

export interface CreateContentData {
  title: string
  description: string
  thumbnail: string
  scheduledDate: string
  scheduledTime: string
  platforms: Platform[]
  status: "idea" | "in-progress" | "review-ready" | "approved"
}

// Represents a single content item with details like title, description, and scheduling information.
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

// Represents a column in a Kanban-like board, containing multiple content items.
export interface Column {
  id: string
  title: string
  items: ContentItem[]
}

// Defines the supported social media platforms for content publishing.
export type Platform = "tiktok" | "instagram" | "facebook" | "twitter" | "linkedin"

// Data required to create a new content item, excluding fields like 'id' and 'comments'.
export interface CreateContentData {
  title: string
  description: string
  thumbnail: string
  scheduledDate: string
  scheduledTime: string
  platforms: Platform[]
  status: "idea" | "in-progress" | "review-ready" | "approved"
}

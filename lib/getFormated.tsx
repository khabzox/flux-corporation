import type { ContentItem } from "@/types"

// Convert sample data to ContentItem format
export const convertSampleToContentItems = (sampleData: any[]): ContentItem[] => {
    return sampleData.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      thumbnail: item.thumbnail,
      scheduledDate: item.scheduledDate,
      scheduledTime: item.scheduledTime,
      platforms: item.platforms,
      assignee: item.assignee,
      comments: item.comments,
      status: item.status as any,
    }))
  }
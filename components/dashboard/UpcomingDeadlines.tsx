"use client"

import { format, parseISO, differenceInDays } from "date-fns"
import { Clock, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SocialPlatformIcons from "./SocialPlatformIcons"
import type { UpcomingDeadlinesProps } from "@/types"


export default function UpcomingDeadlines({ items }: UpcomingDeadlinesProps) {
  // Get today's date
  const today = new Date()

  // Filter and sort items by date (upcoming first)
  const upcomingItems = items
    .filter((item) => item.scheduledDate)
    .sort((a, b) => {
      const dateA = parseISO(a.scheduledDate)
      const dateB = parseISO(b.scheduledDate)
      return dateA.getTime() - dateB.getTime()
    })
    .filter((item) => {
      const itemDate = parseISO(item.scheduledDate)
      return itemDate >= today
    })
    .slice(0, 5) // Take only the first 5 upcoming items

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium">Upcoming Deadlines</h3>
      </div>

      <ScrollArea className="h-[300px]">
        {upcomingItems.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <Clock className="h-6 w-6 text-gray-400" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">No Upcoming Deadlines</h4>
            <p className="text-sm text-gray-500">You're all caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {upcomingItems.map((item) => {
              const itemDate = parseISO(item.scheduledDate)
              const daysUntil = differenceInDays(itemDate, today)

              return (
                <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={item.assignee.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {item.assignee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm truncate">{item.title}</h4>
                        <SocialPlatformIcons platforms={item.platforms} />
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>
                          {format(itemDate, "MMM d")} at {item.scheduledTime}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <Badge
                          variant={daysUntil <= 1 ? "destructive" : daysUntil <= 3 ? "outline" : "secondary"}
                          className="text-xs"
                        >
                          {daysUntil === 0 ? (
                            <span className="flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              Today
                            </span>
                          ) : daysUntil === 1 ? (
                            "Tomorrow"
                          ) : (
                            `In ${daysUntil} days`
                          )}
                        </Badge>

                        <Badge variant="outline" className="capitalize text-xs">
                          {item.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

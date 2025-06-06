"use client"

import { format } from "date-fns"
import { Clock, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ContentItem } from "../types"
import CalendarContentCard from "./CalendarContentCard"

interface CalendarDayDetailProps {
  date: Date
  items: ContentItem[]
  onAddContent: () => void
}

export default function CalendarDayDetail({ date, items, onAddContent }: CalendarDayDetailProps) {
  // Group items by time
  const timeSlots = items.reduce(
    (acc, item) => {
      const time = item.scheduledTime || "No time"
      if (!acc[time]) {
        acc[time] = []
      }
      acc[time].push(item)
      return acc
    },
    {} as Record<string, ContentItem[]>,
  )

  // Sort time slots
  const sortedTimeSlots = Object.entries(timeSlots).sort(([timeA], [timeB]) => {
    if (timeA === "No time") return 1
    if (timeB === "No time") return -1
    return timeA.localeCompare(timeB)
  })

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{format(date, "EEEE, MMMM d, yyyy")}</h3>
          <Button size="sm" variant="outline" onClick={onAddContent}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>

      <Tabs defaultValue="schedule">
        <div className="px-4 pt-2">
          <TabsList className="w-full">
            <TabsTrigger value="schedule" className="flex-1">
              Schedule
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex-1">
              Tasks
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="schedule" className="p-0 m-0">
          <ScrollArea className="h-[400px] p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-gray-400" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1">No Content Scheduled</h4>
                <p className="text-sm text-gray-500 mb-4">There's nothing scheduled for this day yet.</p>
                <Button size="sm" onClick={onAddContent}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Content
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {sortedTimeSlots.map(([time, items]) => (
                  <div key={time}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      <h4 className="font-medium text-sm">{time}</h4>
                    </div>
                    <div className="space-y-2 pl-4">
                      {items.map((item) => (
                        <CalendarContentCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="tasks" className="p-0 m-0">
          <div className="p-4">
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">No Tasks</h4>
              <p className="text-sm text-gray-500 mb-4">There are no tasks for this day yet.</p>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Task
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState, useEffect, useMemo } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
  isToday,
} from "date-fns"

import { Draggable, Droppable } from "@hello-pangea/dnd"

import { CalendarIcon, ChevronLeft, ChevronRight, Filter, Plus, Settings } from "lucide-react"

import MiniCalendar from "./MiniCalendar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import CalendarDayDetail from "./CalendarDayDetail"
import { Skeleton } from "@/components/ui/skeleton"
import UpcomingDeadlines from "./UpcomingDeadlines"
import CalendarContentCard from "./CalendarContentCard"
import CalendarContentStatistics from "./CalendarContentStatistics"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"
import type { CalendarViewProps } from "@/types"

import { sampleCalendarContent } from "@/data/sample-calendar-content"

import { convertSampleToContentItems } from "@/lib/getFormated"


export default function CalendarView({ columns, onAddContent, onUpdateContent }: CalendarViewProps) {
  // Combine items from all columns and add sample calendar content
  const allItems = useMemo(() => {
    const columnItems = columns.flatMap((col) => col.items)
    const calendarItems = convertSampleToContentItems(sampleCalendarContent)
    return [...columnItems, ...calendarItems]
  }, [columns])

  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [calendarView, setCalendarView] = useState<"month" | "week" | "day">("month")
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState<{
    contentType: string[]
    platforms: string[]
    status: string[]
    assignee: string[]
  }>({
    contentType: [],
    platforms: [],
    status: [],
    assignee: [],
  })

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Get days for the current month
  const days = useMemo(() => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    return eachDayOfInterval({ start: monthStart, end: monthEnd })
  }, [currentDate])

  // Get content for a specific day
  const getContentForDay = (day: Date) => {
    return allItems.filter((item) => {
      if (!item.scheduledDate) return false
      const itemDate = parseISO(item.scheduledDate)
      return isSameDay(itemDate, day)
    })
  }

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate((prev) => {
      const newDate = subMonths(prev, 1)
      return newDate
    })
  }

  const goToNextMonth = () => {
    setCurrentDate((prev) => {
      const newDate = addMonths(prev, 1)
      return newDate
    })
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(new Date())
  }

  // Handle day click
  const handleDayClick = (day: Date) => {
    setSelectedDate(day)
  }

  // Handle content drop on a day
  const handleContentDrop = (contentId: string, day: Date) => {
    const item = allItems.find((item) => item.id === contentId)
    if (item) {
      const updatedItem = {
        ...item,
        scheduledDate: format(day, "yyyy-MM-dd"),
      }
      onUpdateContent(updatedItem)
    }
  }

  // Filter content based on active filters
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      // Filter by content type
      if (activeFilters.contentType.length > 0) {
        // This is a mock implementation since we don't have a type field in our data model
        // In a real app, you would check item.type against activeFilters.contentType
        if (!activeFilters.contentType.includes("all")) {
          return false
        }
      }

      // Filter by platforms
      if (activeFilters.platforms.length > 0) {
        const hasMatchingPlatform = item.platforms.some((platform) => activeFilters.platforms.includes(platform))
        if (!hasMatchingPlatform && !activeFilters.platforms.includes("all")) {
          return false
        }
      }

      // Filter by status
      if (activeFilters.status.length > 0) {
        if (!activeFilters.status.includes(item.status) && !activeFilters.status.includes("all")) {
          return false
        }
      }

      // Filter by assignee
      if (activeFilters.assignee.length > 0) {
        // This is a mock implementation
        if (!activeFilters.assignee.includes("all")) {
          return false
        }
      }

      return true
    })
  }, [allItems, activeFilters])

  // Generate calendar grid
  const calendarGrid = useMemo(() => {
    // Create array for day names (Sunday to Saturday)
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Day names header */}
        {dayNames.map((day) => (
          <div key={day} className="p-2 text-center font-medium text-gray-500 text-sm">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((day) => {
          const dayNumber = day.getDate()
          const isCurrentMonth = isSameMonth(day, currentDate)
          const isSelected = selectedDate ? isSameDay(day, selectedDate) : false
          const isTodayDate = isToday(day)
          const contentForDay = getContentForDay(day)

          return (
            <Droppable droppableId={`day-${format(day, "yyyy-MM-dd")}`} key={format(day, "yyyy-MM-dd")}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  onClick={() => handleDayClick(day)}
                  className={cn(
                    "min-h-[100px] border border-gray-200 p-1 transition-all",
                    isCurrentMonth ? "bg-white" : "bg-gray-50",
                    isSelected ? "ring-2 ring-blue-500" : "",
                    isTodayDate ? "bg-blue-50" : "",
                    snapshot.isDraggingOver ? "bg-blue-100" : "",
                  )}
                >
                  <div className="flex justify-between items-start">
                    <span
                      className={cn(
                        "inline-flex items-center justify-center w-6 h-6 rounded-full text-sm",
                        isTodayDate ? "bg-blue-600 text-white font-medium" : "",
                        isCurrentMonth ? "text-gray-900" : "text-gray-400",
                      )}
                    >
                      {dayNumber}
                    </span>
                    {contentForDay.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {contentForDay.length}
                      </Badge>
                    )}
                  </div>

                  {/* Content items for this day */}
                  <div className="mt-1 space-y-1">
                    {isLoading ? (
                      <>
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-3/4" />
                      </>
                    ) : (
                      contentForDay.slice(0, 3).map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={cn("transition-all", snapshot.isDragging ? "opacity-50" : "")}
                            >
                              <CalendarContentCard item={item} isCompact />
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}

                    {/* Show indicator if there are more items */}
                    {contentForDay.length > 3 && (
                      <div className="text-xs text-gray-500 text-center">+{contentForDay.length - 3} more</div>
                    )}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )
        })}
      </div>
    )
  }, [days, currentDate, selectedDate, allItems, isLoading])

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Calendar Area */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            {/* Calendar Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <h2 className="text-lg font-semibold">{format(currentDate, "MMMM yyyy")}</h2>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" onClick={goToPreviousMonth} className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={goToNextMonth} className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={goToToday}>
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Today
                </Button>

                <Select value={calendarView} onValueChange={(value: any) => setCalendarView(value)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="View" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Month</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="day">Day</SelectItem>
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                      {Object.values(activeFilters).some((arr) => arr.length > 0) && (
                        <Badge variant="secondary" className="ml-2">
                          {Object.values(activeFilters).reduce((acc, arr) => acc + arr.length, 0)}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h3 className="font-medium">Filter Content</h3>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Content Type</h4>
                        <div className="flex flex-wrap gap-2">
                          {["All", "Post", "Video", "Story", "Image"].map((type) => (
                            <Badge
                              key={type}
                              variant={activeFilters.contentType.includes(type.toLowerCase()) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => {
                                const typeValue = type.toLowerCase()
                                setActiveFilters((prev) => ({
                                  ...prev,
                                  contentType: prev.contentType.includes(typeValue)
                                    ? prev.contentType.filter((t) => t !== typeValue)
                                    : [...prev.contentType, typeValue],
                                }))
                              }}
                            >
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Platforms</h4>
                        <div className="flex flex-wrap gap-2">
                          {["All", "Instagram", "TikTok", "Facebook", "LinkedIn"].map((platform) => (
                            <Badge
                              key={platform}
                              variant={activeFilters.platforms.includes(platform.toLowerCase()) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => {
                                const platformValue = platform.toLowerCase()
                                setActiveFilters((prev) => ({
                                  ...prev,
                                  platforms: prev.platforms.includes(platformValue)
                                    ? prev.platforms.filter((p) => p !== platformValue)
                                    : [...prev.platforms, platformValue],
                                }))
                              }}
                            >
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Status</h4>
                        <div className="flex flex-wrap gap-2">
                          {["All", "Idea", "In-Progress", "Review-Ready", "Approved"].map((status) => (
                            <Badge
                              key={status}
                              variant={activeFilters.status.includes(status.toLowerCase()) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => {
                                const statusValue = status.toLowerCase()
                                setActiveFilters((prev) => ({
                                  ...prev,
                                  status: prev.status.includes(statusValue)
                                    ? prev.status.filter((s) => s !== statusValue)
                                    : [...prev.status, statusValue],
                                }))
                              }}
                            >
                              {status}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Team Members</h4>
                        <div className="flex flex-wrap gap-2">
                          {["All", "Anna", "John", "Sarah", "Mike"].map((member) => (
                            <Badge
                              key={member}
                              variant={activeFilters.assignee.includes(member.toLowerCase()) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => {
                                const memberValue = member.toLowerCase()
                                setActiveFilters((prev) => ({
                                  ...prev,
                                  assignee: prev.assignee.includes(memberValue)
                                    ? prev.assignee.filter((a) => a !== memberValue)
                                    : [...prev.assignee, memberValue],
                                }))
                              }}
                            >
                              {member}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setActiveFilters({
                              contentType: [],
                              platforms: [],
                              status: [],
                              assignee: [],
                            })
                          }
                        >
                          Clear All
                        </Button>
                        <Button size="sm">Apply Filters</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h3 className="font-medium">Calendar Settings</h3>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Default View</h4>
                        <Select defaultValue="month">
                          <SelectTrigger>
                            <SelectValue placeholder="Select view" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="month">Month</SelectItem>
                            <SelectItem value="week">Week</SelectItem>
                            <SelectItem value="day">Day</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Week Starts On</h4>
                        <Select defaultValue="sunday">
                          <SelectTrigger>
                            <SelectValue placeholder="Select day" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sunday">Sunday</SelectItem>
                            <SelectItem value="monday">Monday</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Time Format</h4>
                        <Select defaultValue="12h">
                          <SelectTrigger>
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                            <SelectItem value="24h">24-hour</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Notifications</h4>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Select notification preference" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All notifications</SelectItem>
                            <SelectItem value="important">Important only</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button className="w-full">Save Settings</Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Calendar Body */}
            <div className="p-4">
              {isLoading ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-7 gap-1">
                    {Array(7)
                      .fill(0)
                      .map((_, i) => (
                        <Skeleton key={i} className="h-8" />
                      ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array(35)
                      .fill(0)
                      .map((_, i) => (
                        <Skeleton key={i} className="h-24" />
                      ))}
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in duration-300">{calendarGrid}</div>
              )}
            </div>

            {/* Quick Actions Toolbar */}
            <div className="fixed bottom-6 right-6 flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      className="rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
                      onClick={() => (selectedDate ? onAddContent(selectedDate) : onAddContent(new Date()))}
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Quick Add Content</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Content Statistics */}
          <CalendarContentStatistics items={allItems} currentMonth={currentDate} />
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          {/* Mini Calendar */}
          <MiniCalendar
            currentDate={currentDate}
            selectedDate={selectedDate}
            onDateChange={setCurrentDate}
            onDateSelect={setSelectedDate}
          />

          {/* Selected Day Detail or Upcoming Deadlines */}
          {selectedDate ? (
            <CalendarDayDetail
              date={selectedDate}
              items={getContentForDay(selectedDate)}
              onAddContent={() => selectedDate && onAddContent(selectedDate)}
            />
          ) : (
            <UpcomingDeadlines items={allItems} />
          )}
        </div>
      </div>
    </div>
  )
}

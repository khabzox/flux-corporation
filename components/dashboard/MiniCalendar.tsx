"use client"

import { useState } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
} from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { MiniCalendarProps } from "@/types"

export default function MiniCalendar({ currentDate, selectedDate, onDateChange, onDateSelect }: MiniCalendarProps) {
  const [viewDate, setViewDate] = useState(currentDate)

  // Get days for the current month view
  const monthStart = startOfMonth(viewDate)
  const monthEnd = endOfMonth(viewDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Navigation functions
  const goToPreviousMonth = () => {
    setViewDate((prev) => subMonths(prev, 1))
  }

  const goToNextMonth = () => {
    setViewDate((prev) => addMonths(prev, 1))
  }

  // Handle day click
  const handleDayClick = (day: Date) => {
    onDateSelect(day)
    onDateChange(day)
  }

  // Create day grid
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{format(viewDate, "MMMM yyyy")}</h3>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={goToPreviousMonth} className="h-6 w-6">
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" onClick={goToNextMonth} className="h-6 w-6">
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-3">
        <div className="grid grid-cols-7 gap-1">
          {/* Day names header */}
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {days.map((day) => {
            const dayNumber = day.getDate()
            const isCurrentMonth = isSameMonth(day, viewDate)
            const isSelected = selectedDate ? isSameDay(day, selectedDate) : false
            const isTodayDate = isToday(day)

            return (
              <Button
                key={format(day, "yyyy-MM-dd")}
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 p-0 text-xs",
                  isCurrentMonth ? "text-gray-900" : "text-gray-400",
                  isSelected ? "bg-blue-100 text-blue-600 font-medium" : "",
                  isTodayDate ? "border border-blue-600" : "",
                )}
                onClick={() => handleDayClick(day)}
              >
                {dayNumber}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

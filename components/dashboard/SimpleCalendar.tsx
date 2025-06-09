// !info: this a temporary component to preview the calendar view

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

// Types and Interfaces
interface ContentItem {
    id: string
    title: string
    date: string
    time: string
    platform: Platform
    status: Status
    description?: string
}

type Platform = "Instagram" | "TikTok" | "Facebook" | "LinkedIn" | "Twitter"
type Status = "approved" | "in-progress" | "review" | "draft"

interface CalendarDay {
    date: Date
    content: ContentItem[]
    isCurrentMonth: boolean
    isToday: boolean
    isSelected: boolean
}

// Sample data with proper typing
const sampleContent: ContentItem[] = [
    {
        id: "1",
        title: "Product Launch Post",
        date: "2025-06-10",
        time: "09:00",
        platform: "Instagram",
        status: "approved",
        description: "Exciting product launch announcement"
    },
    {
        id: "2",
        title: "Behind the Scenes",
        date: "2025-06-15",
        time: "14:30",
        platform: "TikTok",
        status: "in-progress",
        description: "Show our team working on the new features"
    },
    {
        id: "3",
        title: "Customer Testimonial",
        date: "2025-06-20",
        time: "11:00",
        platform: "Facebook",
        status: "review",
        description: "Happy customer sharing their experience"
    },
    {
        id: "4",
        title: "Team Update",
        date: "2025-06-12",
        time: "16:00",
        platform: "LinkedIn",
        status: "draft",
        description: "Monthly team achievements and goals"
    },
    {
        id: "5",
        title: "Tutorial Video",
        date: "2025-06-25",
        time: "10:30",
        platform: "TikTok",
        status: "approved",
        description: "Step-by-step guide for new users"
    }
]

// Style mappings with proper typing
const statusColors: Record<Status, string> = {
    "approved": "bg-green-100 text-green-800 border-green-200",
    "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
    "review": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "draft": "bg-gray-100 text-gray-800 border-gray-200"
}

const platformColors: Record<Platform, string> = {
    "Instagram": "bg-pink-500",
    "TikTok": "bg-black",
    "Facebook": "bg-blue-600",
    "LinkedIn": "bg-blue-700",
    "Twitter": "bg-sky-400"
}

const monthNames: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

const dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function SimpleCalendar() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 5, 1)) // June 2025
    const [selectedDate, setSelectedDate] = useState<number | null>(null)

    // Get days in current month with proper typing
    const getDaysInMonth = (date: Date): Date[] => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const startDate = new Date(firstDay)
        startDate.setDate(startDate.getDate() - firstDay.getDay())

        const days: Date[] = []
        const current = new Date(startDate)

        for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
            days.push(new Date(current))
            current.setDate(current.getDate() + 1)
        }

        return days
    }

    const days = useMemo(() => getDaysInMonth(currentDate), [currentDate])

    // Get content for a specific date
    const getContentForDate = (date: Date): ContentItem[] => {
        const dateStr = date.toISOString().split('T')[0]
        return sampleContent.filter(item => item.date === dateStr)
    }

    // Navigation functions
    const previousMonth = (): void => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
        setSelectedDate(null)
    }

    const nextMonth = (): void => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
        setSelectedDate(null)
    }

    const goToToday = (): void => {
        const today = new Date()
        setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))
        setSelectedDate(today.getDate())
    }

    // Helper functions
    const isCurrentMonth = (date: Date): boolean => {
        return date.getMonth() === currentDate.getMonth()
    }

    const isToday = (date: Date): boolean => {
        const today = new Date()
        return date.toDateString() === today.toDateString()
    }

    // Handle day click
    const handleDayClick = (day: Date): void => {
        if (isCurrentMonth(day)) {
            setSelectedDate(day.getDate())
        }
    }

    // Calculate statistics
    const stats = useMemo(() => {
        const currentMonthContent = sampleContent.filter(item => {
            const itemDate = new Date(item.date)
            return itemDate.getMonth() === currentDate.getMonth() &&
                itemDate.getFullYear() === currentDate.getFullYear()
        })

        return {
            total: currentMonthContent.length,
            approved: currentMonthContent.filter(item => item.status === 'approved').length,
            inReview: currentMonthContent.filter(item => item.status === 'review').length,
            inProgress: currentMonthContent.filter(item => item.status === 'in-progress').length,
            platforms: new Set(currentMonthContent.map(item => item.platform)).size
        }
    }, [currentDate])

    return (
        <div className="w-full p-6 bg-white">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h1>
                    <div className="flex gap-1">
                        <button
                            onClick={previousMonth}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Previous month"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={nextMonth}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Next month"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={goToToday}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Today
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Plus className="w-4 h-4" />
                        Add Content
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                {/* Day Headers */}
                <div className="grid grid-cols-7 bg-gray-50">
                    {dayNames.map(day => (
                        <div key={day} className="p-3 text-center font-medium text-gray-700 border-r border-gray-200 last:border-r-0">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7">
                    {days.map((day, index) => {
                        const dayContent = getContentForDate(day)
                        const isCurrentMonthDay = isCurrentMonth(day)
                        const isTodayDay = isToday(day)
                        const isSelectedDay = selectedDate === day.getDate() && isCurrentMonthDay

                        return (
                            <div
                                key={index}
                                className={`min-h-[120px] p-2 border-r border-b border-gray-200 last:border-r-0 cursor-pointer hover:bg-gray-50 transition-colors ${!isCurrentMonthDay ? 'bg-gray-50 text-gray-400' : 'bg-white'
                                    } ${isSelectedDay ? 'ring-2 ring-blue-500 ring-inset' : ''}`}
                                onClick={() => handleDayClick(day)}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-sm font-medium ${isTodayDay ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs' : ''
                                        }`}>
                                        {day.getDate()}
                                    </span>
                                    {dayContent.length > 0 && (
                                        <span className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded-full font-medium">
                                            {dayContent.length}
                                        </span>
                                    )}
                                </div>

                                {/* Content Items */}
                                <div className="space-y-1">
                                    {dayContent.slice(0, 2).map(item => (
                                        <div
                                            key={item.id}
                                            className={`text-xs p-1.5 rounded border ${statusColors[item.status]} truncate cursor-pointer hover:shadow-sm transition-shadow`}
                                            title={`${item.title} - ${item.time} (${item.platform})`}
                                        >
                                            <div className="flex items-center gap-1">
                                                <div
                                                    className={`w-2 h-2 rounded-full ${platformColors[item.platform]} flex-shrink-0`}
                                                />
                                                <span className="font-medium truncate">{item.title}</span>
                                            </div>
                                            <div className="text-xs opacity-75 mt-0.5">{item.time}</div>
                                        </div>
                                    ))}
                                    {dayContent.length > 2 && (
                                        <div className="text-xs text-gray-500 text-center py-1">
                                            +{dayContent.length - 2} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Statistics */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                    <div className="text-sm text-blue-600">Total Content</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
                    <div className="text-sm text-green-600">Approved</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="text-2xl font-bold text-yellow-600">{stats.inReview}</div>
                    <div className="text-sm text-yellow-600">In Review</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
                    <div className="text-sm text-blue-600">In Progress</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">{stats.platforms}</div>
                    <div className="text-sm text-purple-600">Platforms</div>
                </div>
            </div>

            {/* Selected Date Info */}
            {selectedDate && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-2">
                        Selected: {monthNames[currentDate.getMonth()]} {selectedDate}, {currentDate.getFullYear()}
                    </h3>
                    <div className="text-sm text-gray-600">
                        Content scheduled: {getContentForDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate)).length} items
                    </div>

                    {/* Show content details for selected date */}
                    <div className="mt-3 space-y-2">
                        {getContentForDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate)).map(item => (
                            <div key={item.id} className="flex items-center justify-between p-2 bg-white rounded border">
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${platformColors[item.platform]}`} />
                                    <span className="font-medium">{item.title}</span>
                                    <span className="text-sm text-gray-500">at {item.time}</span>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs ${statusColors[item.status]}`}>
                                    {item.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
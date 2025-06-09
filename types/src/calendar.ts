import type { Column, ContentItem } from "@/types"

export interface CalendarContentStatisticsProps {
    items: ContentItem[]
    currentMonth: Date
}

export interface CalendarDayDetailProps {
    date: Date
    items: ContentItem[]
    onAddContent: () => void
}

export interface CalendarViewProps {
    columns: Column[]
    onAddContent: (date: Date) => void
    onUpdateContent: (item: ContentItem) => void
}



export interface MiniCalendarProps {
    currentDate: Date
    selectedDate: Date | null
    onDateChange: (date: Date) => void
    onDateSelect: (date: Date) => void
}


export interface CalendarContentCardProps {
    item: ContentItem
    isCompact?: boolean
}
import type { Column, ContentItem } from "@/types"

export interface KanbanBoardProps {
    columns: Column[]
    onUpdateColumns: (columns: Column[]) => void
    onUpdateContent: (updatedItem: ContentItem) => void
}

export interface ContentCardProps {
    item: ContentItem;
    onUpdate: (updatedItem: ContentItem) => void;
}
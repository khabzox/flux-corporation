"use client"

import { useState } from "react"
import { DragDropContext, type DropResult } from "@hello-pangea/dnd"
import Sidebar from "@/components/dashboard/Sidebar"
import TopNavigation from "@/components/dashboard/TopNavigation"
import KanbanBoard from "@/components/dashboard/KanbanBoard"
import CalendarView from "@/components/dashboard/SimpleCalendar"
import TableView from "@/components/dashboard/TableView"
import PreviewView from "@/components/dashboard/PreviewView"
import FeedView from "@/components/dashboard/FeedView"
import AnalyticsView from "@/components/dashboard/AnalyticsView"
import CreateContentModal from "@/components/dashboard/CreateContentModal"
import type { ContentItem, Column, CreateContentData } from "@/types"

const initialColumns: Column[] = [
  {
    id: "idea",
    title: "Idea",
    items: [
      {
        id: "1",
        title: "Post a Banner",
        description: "Create promotional banner for new product launch",
        thumbnail: "/person.png?height=100&width=150",
        scheduledDate: "2024-01-05",
        scheduledTime: "7:00 AM",
        platforms: ["tiktok", "instagram", "facebook"],
        assignee: { name: "John Doe", avatar: "/avatar.png?height=32&width=32" },
        comments: 0,
        status: "idea",
      },
      {
        id: "2",
        title: "Post a Banner",
        description: "Social media campaign content",
        thumbnail: "/person.png?height=100&width=150",
        scheduledDate: "2024-01-12",
        scheduledTime: "7:00 AM",
        platforms: ["tiktok", "instagram", "facebook"],
        assignee: { name: "Jane Smith", avatar: "/avatar.png?height=32&width=32" },
        comments: 0,
        status: "idea",
      },
      {
        id: "3",
        title: "Post a Banner",
        description: "Weekly newsletter content",
        thumbnail: "/person.png?height=100&width=150",
        scheduledDate: "2024-01-18",
        scheduledTime: "7:00 AM",
        platforms: ["tiktok", "instagram", "facebook"],
        assignee: { name: "Mike Johnson", avatar: "/avatar.png?height=32&width=32" },
        comments: 0,
        status: "idea",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    items: [
      {
        id: "4",
        title: "Post a Banner",
        description: "Instagram story series",
        thumbnail: "/person.png?height=100&width=150",
        scheduledDate: "2024-01-22",
        scheduledTime: "7:00 AM",
        platforms: ["tiktok", "instagram", "facebook"],
        assignee: { name: "Sarah Wilson", avatar: "/avatar.png?height=32&width=32" },
        comments: 0,
        status: "in-progress",
      },
      {
        id: "5",
        title: "Post a Banner",
        description: "TikTok video content",
        thumbnail: "/person.png?height=100&width=150",
        scheduledDate: "2024-01-28",
        scheduledTime: "7:00 AM",
        platforms: ["tiktok", "instagram", "facebook"],
        assignee: { name: "Alex Brown", avatar: "/avatar.png?height=32&width=32" },
        comments: 0,
        status: "in-progress",
      },
    ],
  },
  {
    id: "review-ready",
    title: "Review Ready",
    items: [],
  },
  {
    id: "approved",
    title: "Approved",
    items: [],
  },
]

export default function ContentManagementApp() {
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [currentView, setCurrentView] = useState<string>("Board")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { source, destination } = result

    // Handle drag between columns in board view
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.find((col) => col.id === source.droppableId)
      const destColumn = columns.find((col) => col.id === destination.droppableId)

      if (sourceColumn && destColumn) {
        const sourceItems = [...sourceColumn.items]
        const destItems = [...destColumn.items]
        const [removed] = sourceItems.splice(source.index, 1)

        // Update the item's status
        removed.status = destination.droppableId as any
        destItems.splice(destination.index, 0, removed)

        setColumns(
          columns.map((col) => {
            if (col.id === source.droppableId) {
              return { ...col, items: sourceItems }
            }
            if (col.id === destination.droppableId) {
              return { ...col, items: destItems }
            }
            return col
          }),
        )
      }
    } else {
      const column = columns.find((col) => col.id === source.droppableId)
      if (column) {
        const copiedItems = [...column.items]
        const [removed] = copiedItems.splice(source.index, 1)
        copiedItems.splice(destination.index, 0, removed)

        setColumns(columns.map((col) => (col.id === source.droppableId ? { ...col, items: copiedItems } : col)))
      }
    }
  }

  const handleCreateContent = (newContent: CreateContentData) => {
    const newItem: ContentItem = {
      ...newContent,
      id: Date.now().toString(),
      comments: 0,
      assignee: { name: "Current User", avatar: "/placeholder.svg?height=32&width=32" },
    }

    const ideaColumn = columns.find((col) => col.id === "idea")
    if (ideaColumn) {
      setColumns(columns.map((col) => (col.id === "idea" ? { ...col, items: [...col.items, newItem] } : col)))
    }
    setIsCreateModalOpen(false)
  }

  const handleAddContent = (date?: Date) => {
    setSelectedDate(date || null)
    setIsCreateModalOpen(true)
  }

  const handleUpdateContent = (updatedItem: ContentItem) => {
    setColumns(
      columns.map((column) => ({
        ...column,
        items: column.items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
      })),
    )
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "Calendar":
        return <CalendarView />
      case "Board":
        return (
          <DragDropContext onDragEnd={handleDragEnd}>
            <KanbanBoard columns={columns} />
          </DragDropContext>
        )
      case "Table":
        return <TableView columns={columns} />
      case "Preview":
        return <PreviewView columns={columns} />
      case "Feed":
        return <FeedView columns={columns} />
      case "Analytics":
        return <AnalyticsView columns={columns} />
      default:
        return (
          <DragDropContext onDragEnd={handleDragEnd}>
            <KanbanBoard columns={columns} />
          </DragDropContext>
        )
    }
  }

  return (
    <div className="flex h-screen">
      <Sidebar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="flex-1 flex flex-col">
        <TopNavigation
          currentView={currentView}
          onViewChange={setCurrentView}
          onAddContent={() => handleAddContent()}
          selectedFilters={selectedFilters}
          onFiltersChange={setSelectedFilters}
        />

        <main className="flex-1 overflow-auto">{renderCurrentView()}</main>
      </div>

      <CreateContentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateContent}
        selectedDate={selectedDate}
      />
    </div>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { Droppable, Draggable } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import ContentCard from "./ContentCard"
import type { Column, ContentItem } from "@/types"
import Image from "next/image"
import type { KanbanBoardProps, ContentCardProps } from "@/types"
import { ColumnHeader } from "./ColumnHeader"

const WrappedContentCard = ({ item, onUpdate }: ContentCardProps) => {
  return <ContentCard item={item} onUpdate={onUpdate} />;
};

export default function KanbanBoard({ columns, onUpdateColumns, onUpdateContent }: KanbanBoardProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleRenameColumn = (columnId: string, newTitle: string) => {
    const updatedColumns = columns.map(col =>
      col.id === columnId ? { ...col, title: newTitle } : col
    )
    onUpdateColumns(updatedColumns)
  }

  const handleAddSection = (columnId: string, type: 'left' | 'right' | 'card') => {
    if (type === 'card') {
      // Add new untitled card
      const newCard: ContentItem = {
        id: Date.now().toString(),
        title: "Untitled",
        description: "New content item",
        thumbnail: "/person.png",
        scheduledDate: new Date().toISOString().split('T')[0],
        scheduledTime: "7:00 AM",
        platforms: ["instagram"] as any[],
        assignee: { name: "Current User", avatar: "/avatar.png" },
        comments: 0,
        status: columnId as any,
      }
      const updatedColumns = columns.map(col =>
        col.id === columnId
          ? { ...col, items: [...col.items, newCard] }
          : col
      )
      onUpdateColumns(updatedColumns)
    } else {
      // Add new section (left or right)
      const columnIndex = columns.findIndex(col => col.id === columnId)
      const newColumn: Column = {
        id: `section-${Date.now()}`,
        title: "New Section",
        items: [],
      }
      const newColumns = [...columns]
      if (type === 'left') {
        newColumns.splice(columnIndex, 0, newColumn)
      } else {
        newColumns.splice(columnIndex + 1, 0, newColumn)
      }

      onUpdateColumns(newColumns)
    }
  }

  const handleRemoveSection = (columnId: string) => {
    if (columns.length > 1) {
      const updatedColumns = columns.filter(col => col.id !== columnId)
      onUpdateColumns(updatedColumns)
    }
  }

  // Mouse drag to scroll functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
    scrollContainerRef.current.style.cursor = 'grabbing'
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab'
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab'
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  // Wheel scroll functionality - only for horizontal scrolling when shift is held
  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollContainerRef.current) return
    // Only handle horizontal scrolling when Shift key is pressed
    if (e.shiftKey) {
      e.preventDefault()
      scrollContainerRef.current.scrollLeft += e.deltaY
    }
    // Otherwise, let normal vertical scrolling happen
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.style.cursor = 'grab'
    }
  }, [])

  return (
    <div className="p-6 w-full h-full max-w-[85vw]">
      <div
        ref={scrollContainerRef}
        className="flex gap-4 w-full h-full overflow-x-auto scrollbar-hide select-none"
        style={{
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* IE and Edge */
        }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
      >
        {/* Add custom CSS to hide webkit scrollbar */}
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {columns.map((column, columnIndex) => (
          <div key={column.id} className="min-w-80 max-w-[314px] bg-gray-50 rounded-lg flex flex-col">
            <ColumnHeader
              column={column}
              onRename={handleRenameColumn}
              onAddSection={handleAddSection}
              onRemoveSection={handleRemoveSection}
              columnIndex={columnIndex}
              totalColumns={columns.length}
            />

            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex-1 p-4 space-y-3"
                >
                  {column.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <WrappedContentCard item={item} onUpdate={onUpdateContent} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {column.items.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                      <Image src="/file.svg" width={46} height={46} alt="empty file" />

                      <p className="text-[#141C25] text-sm mb-3">No content currently. Board is empty</p>

                      <Button
                        className="bg-blue-600 hover:bg-blue-600/90 h-[36px] w-[117px] rounded-2xl mt-4"
                        size="sm"
                        onClick={() => handleAddSection(column.id, 'card')}
                      >
                        Add Content
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </div>
  )
}
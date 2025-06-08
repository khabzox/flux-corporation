
"use client"
import { useState, useRef, useEffect } from "react"
import { Droppable, Draggable } from "@hello-pangea/dnd"
import { Plus, MoreHorizontal, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ContentCard from "./ContentCard"
import type { Column, ContentItem } from "@/types"
import Icon from "@/lib/IconLibrary"

interface KanbanBoardProps {
  columns: Column[]
  onUpdateColumns: (columns: Column[]) => void
  onUpdateContent: (updatedItem: ContentItem) => void
}

// Column Header Component
const ColumnHeader = ({ 
  column, 
  onRename, 
  onAddSection, 
  onRemoveSection, 
  columnIndex, 
  totalColumns 
}: {
  column: Column
  onRename: (columnId: string, newTitle: string) => void
  onAddSection: (columnId: string, type: 'left' | 'right' | 'card') => void
  onRemoveSection: (columnId: string) => void
  columnIndex: number
  totalColumns: number
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(column.title)
  const [showMenu, setShowMenu] = useState(false)

  const handleTitleClick = () => {
    setIsEditing(true)
  }

  const handleTitleSubmit = () => {
    onRename(column.id, title)
    setIsEditing(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSubmit()
    } else if (e.key === 'Escape') {
      setTitle(column.title)
      setIsEditing(false)
    }
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center gap-3">
        {isEditing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleSubmit}
            onKeyDown={handleKeyPress}
            className="font-medium text-gray-900 bg-transparent border-b border-blue-500 outline-none"
            autoFocus
          />
        ) : (
          <h3 
            onClick={handleTitleClick}
            className="font-medium text-gray-900 cursor-pointer hover:text-blue-600"
          >
            {column.title}
          </h3>
        )}
        
        <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">
          {column.items.length}
        </span>
      </div>

      <div className="flex items-center gap-2 relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAddSection(column.id, 'card')}
        >
          <Plus className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowMenu(!showMenu)}
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
        
        {showMenu && (
          <div className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg z-10 min-w-48">
            <button
              onClick={() => {
                onAddSection(column.id, 'left')
                setShowMenu(false)
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Add section left
            </button>
            
            <button
              onClick={() => {
                onAddSection(column.id, 'right')
                setShowMenu(false)
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <ChevronRight className="w-4 h-4" />
              Add section right
            </button>
            
            <button
              onClick={() => {
                setIsEditing(true)
                setShowMenu(false)
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Rename
            </button>
            
            {totalColumns > 1 && (
              <button
                onClick={() => {
                  onRemoveSection(column.id)
                  setShowMenu(false)
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Remove section
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

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
          <div key={column.id} className="min-w-80 bg-gray-50 rounded-lg flex flex-col">
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
                          <ContentCard item={item} onUpdate={onUpdateContent} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {column.items.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                        <Plus className="w-6 h-6" />
                      </div>
                      
                      <p className="text-sm mb-3">No content currently. Board is empty</p>
                      
                      <Button
                        variant="outline"
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
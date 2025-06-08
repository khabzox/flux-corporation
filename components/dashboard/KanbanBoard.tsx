"use client"

import { useState } from "react"
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
    <div className="flex items-center justify-between mb-4 border-b border-[#d0d5dd] pb-4">
      <div className="flex items-center gap-2">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleSubmit}
            onKeyDown={handleKeyPress}
            className="font-medium text-gray-900 bg-transparent border-b border-blue-500 outline-none"
            autoFocus
          />
        ) : (
          <h3 
            className="font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={handleTitleClick}
          >
            {column.title}
          </h3>
        )}
        <span className="bg-[#E5F2FF] text-[#005CE5] text-xs px-2 py-1 rounded-full">
          {column.items.length}
        </span>
      </div>
      <div className="flex items-center gap-1 relative">
        <Button
          size="sm"
          variant="ghost"
          className="w-6 h-6 p-0"
          onClick={() => onAddSection(column.id, 'card')}
        >
          <Plus className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="w-6 h-6 p-0"
          onClick={() => setShowMenu(!showMenu)}
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
        
        {showMenu && (
          <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[160px]">
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

  return (
    <div className="p-6 max-w-[100vh]">
      <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(300px, 1fr))` }}>
        {columns.map((column, columnIndex) => (
          <div key={column.id} className="bg-[#E4E7EC]/50 rounded-lg p-4">
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
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`space-y-3 min-h-[200px] ${
                    snapshot.isDraggingOver ? "bg-blue-50 rounded-lg p-2" : ""
                  }`}
                >
                  {column.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${snapshot.isDragging ? "rotate-2 shadow-lg" : ""}`}
                        >
                          <ContentCard item={item} onEdit={onUpdateContent} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}

                  {column.items.length === 0 && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <Icon name="file" width={20} height={20} />
                      </div>
                      <p className="text-gray-500 text-sm mb-3">No content currently. Board is empty</p>
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
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
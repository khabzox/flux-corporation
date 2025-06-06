"use client"

import { Droppable, Draggable } from "@hello-pangea/dnd"
import { Plus, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import ContentCard from "./ContentCard"
import type { Column } from "../types"

interface KanbanBoardProps {
  columns: Column[]
}

export default function KanbanBoard({ columns }: KanbanBoardProps) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-4 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900">{column.title}</h3>
                <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">{column.items.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <Button size="sm" variant="ghost" className="w-6 h-6 p-0">
                  <Plus className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="w-6 h-6 p-0">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`space-y-3 min-h-[200px] ${snapshot.isDraggingOver ? "bg-blue-50 rounded-lg" : ""}`}
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
                          <ContentCard item={item} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}

                  {column.items.length === 0 && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <span className="text-2xl">📋</span>
                      </div>
                      <p className="text-gray-500 text-sm mb-3">No content currently. Board is empty</p>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
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

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import type { Column } from "@/types"

// Column Header Component
export const ColumnHeader = ({
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
    const [showAddSubmenu, setShowAddSubmenu] = useState(false)

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

                <span className="px-2 py-1 text-xs bg-[#E5F2FF] text-[#005CE5] rounded-full">
                    {column.items.length}
                </span>
            </div>

            <div className="flex items-center relative">
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
                                setIsEditing(true)
                                setShowMenu(false)
                            }}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                        >
                            <Edit2 className="w-4 h-4" />
                            Rename
                        </button>

                        <div className="relative">
                            <button
                                onMouseEnter={() => setShowAddSubmenu(true)}
                                onMouseLeave={() => setShowAddSubmenu(false)}
                                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <Plus className="w-4 h-4" />
                                    Add section
                                </div>
                                <ChevronRight className="w-4 h-4" />
                            </button>

                            {showAddSubmenu && (
                                <div
                                    className={`absolute ${columnIndex === totalColumns - 1 ? 'right-full' : 'left-full'} top-0 bg-white border rounded-lg shadow-lg z-20 min-w-44`}
                                    onMouseEnter={() => setShowAddSubmenu(true)}
                                    onMouseLeave={() => setShowAddSubmenu(false)}
                                >
                                    <button
                                        onClick={() => {
                                            onAddSection(column.id, 'left')
                                            setShowMenu(false)
                                            setShowAddSubmenu(false)
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
                                            setShowAddSubmenu(false)
                                        }}
                                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                        Add section right
                                    </button>
                                </div>
                            )}
                        </div>

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
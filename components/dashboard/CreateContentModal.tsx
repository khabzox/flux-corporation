"use client"

import React, { useState, useEffect } from "react"
import { X, Upload, Plus, ChevronLeft, ChevronRight, MoreHorizontal, Paperclip, Smile, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Icon from "@/lib/IconLibrary"

// Types
interface CreateContentData {
  title: string
  assignee: string
  description: string
  thumbnail: string
  scheduledDate: string
  scheduledTime: string
  platforms: Platform[]
  status: "idea" | "draft" | "review" | "approved" | "scheduled" | "published"
}

type Platform = "tiktok" | "instagram" | "facebook" | "twitter" | "linkedin"

interface CreateContentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CreateContentData) => void
  selectedDate?: Date | null
}

const platforms: { id: Platform; label: string }[] = [
  { id: "tiktok", label: "TikTok" },
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
  { id: "twitter", label: "Twitter" },
  { id: "linkedin", label: "LinkedIn" },
]

const CreateContentModal: React.FC<CreateContentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  selectedDate
}) => {
  const [formData, setFormData] = useState<CreateContentData>({
    title: "",
    assignee: "",
    description: "",
    thumbnail: "/placeholder.svg?height=100&width=150",
    scheduledDate: selectedDate ? selectedDate.toISOString().split('T')[0] : "2025-01-17",
    scheduledTime: "07:00",
    platforms: [],
    status: "idea",
  })

  const [activeTab, setActiveTab] = useState<"internal" | "client">("internal")

  useEffect(() => {
    if (selectedDate) {
      setFormData((prev) => ({
        ...prev,
        scheduledDate: selectedDate.toISOString().split('T')[0],
      }))
    }
  }, [selectedDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      title: "",
      assignee: "",
      description: "",
      thumbnail: "/placeholder.svg?height=100&width=150",
      scheduledDate: "",
      scheduledTime: "",
      platforms: [],
      status: "idea",
    })
  }

  const handlePlatformChange = (platform: Platform, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        platforms: [...prev.platforms, platform],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        platforms: prev.platforms.filter((p) => p !== platform),
      }))
    }
  }

  const handleInputChange = (field: keyof CreateContentData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-8 px-3 text-gray-600 border-gray-300">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-8 px-3 text-gray-600 border-gray-300">
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 px-3 text-gray-600 border-gray-300">
              <Icon name="post" /> Post Organically
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Main Content Layout */}
                <div className="flex gap-8">
                  {/* Upload Area */}
                  <div className="w-72 flex-shrink-0">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg h-96 flex flex-col items-center justify-center text-center p-6 hover:border-gray-400 transition-colors cursor-pointer">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <Plus className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-900 mb-1">Click to upload</p>
                      <p className="text-xs text-gray-500 mb-1">or drag and drop</p>
                      <p className="text-xs text-gray-400">PNG or JPG (max. 800x400px)</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="flex-1 space-y-6">
                    {/* Title */}
                    <div className="text-start">
                      <h1 className="text-xl font-semibold text-gray-900">Create Content - User Profile Page</h1>
                    </div>
                    {/* Assignee */}
                    <div className="flex items-center gap-4">
                      <Label className="text-sm font-medium text-gray-700 w-20 flex-shrink-0">Assignee</Label>
                      <div className="flex-1 flex items-center gap-2">
                        <Input
                          placeholder="Assignee"
                          value={formData.assignee}
                          onChange={handleInputChange('assignee')}
                          className="flex-1 h-9"
                        />
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-400">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Caption */}
                    <div className="flex gap-4">
                      <Label className="text-sm font-medium text-gray-700 w-20 flex-shrink-0 pt-2">Caption</Label>
                      <Textarea
                        placeholder="Write your caption..."
                        value={formData.description}
                        onChange={handleInputChange('description')}
                        className="flex-1 min-h-[80px] resize-none"
                      />
                    </div>

                    {/* Schedule */}
                    <div className="flex items-center gap-4">
                      <Label className="text-sm font-medium text-gray-700 w-20 flex-shrink-0">Schedule</Label>
                      <div className="flex gap-3">
                        <Input
                          type="date"
                          value={formData.scheduledDate}
                          onChange={handleInputChange('scheduledDate')}
                          className="h-9"
                        />
                        <Input
                          type="time"
                          value={formData.scheduledTime}
                          onChange={handleInputChange('scheduledTime')}
                          className="h-9 w-32"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Content Area */}
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <Textarea
                    placeholder="Write notes for your editors, ideas, examples..."
                    className="w-full min-h-[120px] resize-none border-gray-200"
                  />
                </div>

                {/* Toolbar */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600 font-bold">
                      B
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600 italic">
                      I
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600">
                      S
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600">
                      ≡
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600">
                      A
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="w-80 border-l border-gray-200 bg-gray-50 flex flex-col">
            <div className="p-4 bg-white border-b border-gray-200">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "internal" | "client")}>
                <TabsList className="grid w-full grid-cols-2 h-9">
                  <TabsTrigger value="internal" className="text-sm">Internal Chat</TabsTrigger>
                  <TabsTrigger value="client" className="text-sm">Client Chat</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  💬
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Internal Chat</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Only your team members will be able to see this chat. Use it to collaborate internally.
                </p>
              </div>
            </div>

            <div className="p-4 flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600">
                <Smile className="w-4 h-4" />
              </Button>
              <Input
                placeholder="Leave a comment..."
                className="w-48 h-8 text-sm"
              />
              <Button size="sm" className="h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateContentModal
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { X, Upload, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { CreateContentData, Platform } from "../types"

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

export default function CreateContentModal({ isOpen, onClose, onSubmit, selectedDate }: CreateContentModalProps) {
  const [formData, setFormData] = useState<CreateContentData>({
    title: "",
    description: "",
    thumbnail: "/placeholder.svg?height=100&width=150",
    scheduledDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
    scheduledTime: "",
    platforms: [],
    status: "idea",
  })

  const [activeTab, setActiveTab] = useState<"internal" | "client">("internal")

  useEffect(() => {
    if (selectedDate) {
      setFormData((prev) => ({
        ...prev,
        scheduledDate: format(selectedDate, "yyyy-MM-dd"),
      }))
    }
  }, [selectedDate])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      title: "",
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              ← Previous
            </Button>
            <h2 className="text-lg font-semibold">Create Content - User Profile Page</h2>
            <Button variant="ghost" size="sm">
              Next →
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              📋 Post Organically
            </Button>
            <Button variant="ghost" size="sm">
              ⋮
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Assignee */}
              <div className="flex items-center gap-4">
                <Label className="text-sm font-medium text-gray-700 w-20">Assignee</Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="text-gray-500">
                    Assignee
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Media Upload */}
              <div className="flex gap-6">
                <div className="w-48">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 mb-1">Click to upload</p>
                    <p className="text-xs text-gray-400">or drag and drop</p>
                    <p className="text-xs text-gray-400">PNG or JPG (max. 800x400px)</p>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  {/* Caption */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Caption</Label>
                    <Textarea
                      placeholder="Write your caption..."
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      className="min-h-[100px]"
                    />
                  </div>

                  {/* Schedule */}
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Schedule</Label>
                      <Input
                        type="date"
                        value={formData.scheduledDate}
                        onChange={(e) => setFormData((prev) => ({ ...prev, scheduledDate: e.target.value }))}
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">&nbsp;</Label>
                      <Input
                        type="time"
                        value={formData.scheduledTime}
                        onChange={(e) => setFormData((prev) => ({ ...prev, scheduledTime: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Platforms */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Platforms</Label>
                <div className="flex gap-4">
                  {platforms.map((platform) => (
                    <div key={platform.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={platform.id}
                        checked={formData.platforms.includes(platform.id)}
                        onCheckedChange={(checked) => handlePlatformChange(platform.id, checked as boolean)}
                      />
                      <Label htmlFor={platform.id} className="text-sm">
                        {platform.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Title</Label>
                <Input
                  placeholder="Content title..."
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>

              {/* Notes */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Button variant="ghost" size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Textarea placeholder="Write notes for your editors, ideas, examples..." className="min-h-[120px]" />
              </div>

              {/* Toolbar */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" type="button">
                    B
                  </Button>
                  <Button variant="ghost" size="sm" type="button">
                    I
                  </Button>
                  <Button variant="ghost" size="sm" type="button">
                    S
                  </Button>
                  <Button variant="ghost" size="sm" type="button">
                    ≡
                  </Button>
                  <Button variant="ghost" size="sm" type="button">
                    A
                  </Button>
                  <Button variant="ghost" size="sm" type="button">
                    😊
                  </Button>
                  <Button variant="ghost" size="sm" type="button">
                    📎
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" type="button">
                    📎
                  </Button>
                  <Button variant="ghost" size="sm" type="button">
                    😊
                  </Button>
                  <Input placeholder="Leave a comment..." className="w-48" />
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    →
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {/* Chat Sidebar */}
          <div className="w-80 border-l border-gray-200 bg-gray-50">
            <div className="p-4">
              <div className="flex gap-2 mb-4">
                <Button
                  variant={activeTab === "internal" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("internal")}
                  className={activeTab === "internal" ? "bg-blue-600 text-white" : ""}
                >
                  Internal Chat
                </Button>
                <Button
                  variant={activeTab === "client" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("client")}
                  className={activeTab === "client" ? "bg-blue-600 text-white" : ""}
                >
                  Client Chat
                </Button>
              </div>

              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">💬</div>
                <h3 className="font-medium text-gray-900 mb-2">Internal Chat</h3>
                <p className="text-sm text-gray-500">
                  Only your team members will be able to see this chat. Use it to collaborate internally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

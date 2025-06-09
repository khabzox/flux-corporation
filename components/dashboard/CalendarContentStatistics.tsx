"use client"

import { useMemo } from "react"
import { format, parseISO, isSameMonth } from "date-fns"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { CalendarContentStatisticsProps } from "@/types"

export default function CalendarContentStatistics({ items, currentMonth }: CalendarContentStatisticsProps) {
  // Filter items for the current month
  const currentMonthItems = useMemo(() => {
    return items.filter((item) => {
      if (!item.scheduledDate) return false
      const itemDate = parseISO(item.scheduledDate)
      return isSameMonth(itemDate, currentMonth)
    })
  }, [items, currentMonth])

  // Count items by platform
  const platformCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    currentMonthItems.forEach((item) => {
      item.platforms.forEach((platform) => {
        counts[platform] = (counts[platform] || 0) + 1
      })
    })
    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }, [currentMonthItems])

  // Count items by status
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    currentMonthItems.forEach((item) => {
      counts[item.status] = (counts[item.status] || 0) + 1
    })
    return Object.entries(counts).map(([name, value]) => ({
      name: name.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      value,
    }))
  }, [currentMonthItems])

  // Count items by day of month
  const dailyCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    currentMonthItems.forEach((item) => {
      if (!item.scheduledDate) return
      const day = format(parseISO(item.scheduledDate), "d")
      counts[day] = (counts[day] || 0) + 1
    })

    // Create array with all days of month
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = String(i + 1)
      return {
        day,
        count: counts[day] || 0,
      }
    })
  }, [currentMonthItems, currentMonth])

  // Platform colors
  const PLATFORM_COLORS = {
    instagram: "#E1306C",
    tiktok: "#000000",
    facebook: "#1877F2",
    linkedin: "#0A66C2",
    twitter: "#1DA1F2",
  }

  // Status colors
  const STATUS_COLORS = {
    Idea: "#9CA3AF",
    "In Progress": "#3B82F6",
    "Review Ready": "#F59E0B",
    Approved: "#10B981",
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Content Statistics</CardTitle>
        <CardDescription>
          {format(currentMonth, "MMMM yyyy")} • {currentMonthItems.length} items scheduled
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="h-[200px]">
              <ChartContainer
                config={{
                  count: {
                    label: "Content Count",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyCounts}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" />
                    <YAxis allowDecimals={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-500">Total Content</div>
                  <div className="text-2xl font-bold">{currentMonthItems.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-500">Platforms</div>
                  <div className="text-2xl font-bold">{platformCounts.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-500">Approved</div>
                  <div className="text-2xl font-bold">
                    {statusCounts.find((s) => s.name === "Approved")?.value || 0}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-500">In Progress</div>
                  <div className="text-2xl font-bold">
                    {statusCounts.find((s) => s.name === "In Progress")?.value || 0}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="platforms">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2 h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformCounts}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {platformCounts.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={PLATFORM_COLORS[entry.name as keyof typeof PLATFORM_COLORS] || "#8884d8"}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full md:w-1/2">
                <div className="space-y-4">
                  {platformCounts.map((platform) => (
                    <div key={platform.name} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{
                          backgroundColor: PLATFORM_COLORS[platform.name as keyof typeof PLATFORM_COLORS] || "#8884d8",
                        }}
                      />
                      <div className="flex-1 capitalize">{platform.name}</div>
                      <div className="font-medium">{platform.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="status">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2 h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusCounts}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusCounts.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS] || "#8884d8"}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full md:w-1/2">
                <div className="space-y-4">
                  {statusCounts.map((status) => (
                    <div key={status.name} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{
                          backgroundColor: STATUS_COLORS[status.name as keyof typeof STATUS_COLORS] || "#8884d8",
                        }}
                      />
                      <div className="flex-1">{status.name}</div>
                      <div className="font-medium">{status.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

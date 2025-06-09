"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import SocialPlatformIcons from "./SocialPlatformIcons"
import type { TableViewProps } from "@/types/table-view"

export default function TableView({ columns }: TableViewProps) {
  const allItems = columns.flatMap((col) => col.items)

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Scheduled</TableHead>
              <TableHead>Platforms</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Comments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize">
                    {item.status.replace("-", " ")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{item.scheduledDate}</div>
                    <div className="text-gray-500">{item.scheduledTime}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <SocialPlatformIcons platforms={item.platforms} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={item.assignee.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">
                        {item.assignee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{item.assignee.name}</span>
                  </div>
                </TableCell>
                <TableCell>{item.comments}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

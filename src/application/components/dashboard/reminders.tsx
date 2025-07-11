"use client"

import { Card, CardContent, Typography, Box, Chip } from "@mui/material"
import { Circle as CircleIcon } from "@mui/icons-material"

const reminders = [
  {
    title: "Review Product Inventory",
    type: "Inventory Management",
    priority: "high",
    color: "#e74c3c",
  },
  {
    title: "User Onboarding Flow",
    type: "User Experience",
    priority: "medium",
    color: "#f39c12",
  },
  {
    title: "Database Optimization",
    type: "System Performance",
    priority: "low",
    color: "#2d5a3d",
  },
  {
    title: "Security Audit Review",
    type: "Security",
    priority: "high",
    color: "#9b59b6",
  },
]

export function Reminders() {
  return (
    <Card sx={{ height: 300 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Reminders
          </Typography>
          <Chip label="New" size="small" color="primary" />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {reminders.map((reminder, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
              <CircleIcon sx={{ fontSize: 8, color: reminder.color, mt: 1 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.9rem", mb: 0.5 }}>
                  {reminder.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {reminder.type}
                </Typography>
              </Box>
              <Chip
                label={reminder.priority}
                size="small"
                color={reminder.priority === "high" ? "error" : reminder.priority === "medium" ? "warning" : "success"}
                sx={{ fontSize: "0.7rem", height: 20 }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

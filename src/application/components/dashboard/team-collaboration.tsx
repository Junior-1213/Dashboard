"use client"

import { Card, CardContent, Typography, Box, Avatar, Button, Chip } from "@mui/material"
import { Add as AddIcon } from "@mui/icons-material"

const teamMembers = [
  {
    name: "Alexandra Duff",
    role: "Product Manager",
    avatar: "AD",
    status: "Connected",
    color: "#2d5a3d",
  },
  {
    name: "Edwin Adeoha",
    role: "System Administrator",
    avatar: "EA",
    status: "Connected",
    color: "#e74c3c",
  },
  {
    name: "Isaac Okafor",
    role: "Quality Assurance",
    avatar: "IO",
    status: "Pending",
    color: "#f39c12",
  },
  {
    name: "David Orhoof",
    role: "Backend Developer",
    avatar: "DO",
    status: "Connected",
    color: "#9b59b6",
  },
]

export function TeamCollaboration() {
  return (
    <Card sx={{ height: 300 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Team Collaboration
          </Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            sx={{
              borderColor: "#2d5a3d",
              color: "#2d5a3d",
              "&:hover": {
                borderColor: "#2d5a3d",
                backgroundColor: "rgba(45, 90, 61, 0.04)",
              },
            }}
          >
            Add Member
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {teamMembers.map((member, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ width: 40, height: 40, backgroundColor: member.color, fontSize: "0.9rem" }}>
                {member.avatar}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.9rem" }}>
                  {member.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {member.role}
                </Typography>
              </Box>
              <Chip
                label={member.status}
                size="small"
                color={member.status === "Connected" ? "success" : "warning"}
                sx={{ fontSize: "0.75rem" }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

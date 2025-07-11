"use client"

import { Card, CardContent, Typography, Box, CircularProgress } from "@mui/material"

export function ProjectProgress() {
  const progress = 68

  return (
    <Card sx={{ height: 200 }}>
      <CardContent
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Project Progress
        </Typography>
        <Box sx={{ position: "relative", display: "inline-flex", mb: 2 }}>
          <CircularProgress
            variant="determinate"
            value={progress}
            size={80}
            thickness={6}
            sx={{
              color: "#2d5a3d",
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: "#2d5a3d" }}>
              {progress}%
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#2d5a3d" }} />
            <Typography variant="caption" color="text.secondary">
              Completed
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#e0e0e0" }} />
            <Typography variant="caption" color="text.secondary">
              In Progress
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material"
import { PlayArrow, Pause, Stop } from "@mui/icons-material"

export function TimeTracker() {
  const [time, setTime] = useState(5048) // 01:24:08 in seconds
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card
      sx={{
        height: 200,
        background: "linear-gradient(135deg, #2d5a3d 0%, #1e3d2a 100%)",
        color: "white",
      }}
    >
      <CardContent
        sx={{ p: 3, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
          Time Tracker
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: 700, fontSize: "2.5rem", mb: 2 }}>
            {formatTime(time)}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            <IconButton
              onClick={() => setIsRunning(!isRunning)}
              sx={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.3)",
                },
              }}
            >
              {isRunning ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton
              onClick={() => {
                setIsRunning(false)
                setTime(0)
              }}
              sx={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.3)",
                },
              }}
            >
              <Stop />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

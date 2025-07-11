"use client"

import { useAppSelector } from "../../hooks/useAppSelector"
import { Grid, Card, CardContent, Typography, Box, LinearProgress } from "@mui/material"
import {
  Inventory as ProductsIcon,
  People as UsersIcon,
  TrendingUp as TrendingIcon,
  PendingActions as PendingIcon,
} from "@mui/icons-material"

export function StatsCards() {
  const { products } = useAppSelector((state) => state.products)
  const { users } = useAppSelector((state) => state.users)

  const totalProducts = products.length
  const activeProducts = products.filter((p) => p.status === "active").length
  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.status === "active").length

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      subtitle: "Increased from last month",
      icon: ProductsIcon,
      color: "#2d5a3d",
      bgColor: "#2d5a3d",
      progress: 85,
    },
    {
      title: "Active Products",
      value: activeProducts,
      subtitle: "Currently available",
      icon: TrendingIcon,
      color: "#e74c3c",
      bgColor: "#fff",
      progress: 70,
      border: true,
    },
    {
      title: "Total Users",
      value: totalUsers,
      subtitle: "Registered users",
      icon: UsersIcon,
      color: "#f39c12",
      bgColor: "#fff",
      progress: 60,
      border: true,
    },
    {
      title: "Pending Reviews",
      value: 3,
      subtitle: "Need attention",
      icon: PendingIcon,
      color: "#9b59b6",
      bgColor: "#fff",
      progress: 25,
      border: true,
    },
  ]

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => {
        const Icon = stat.icon
        const isMainCard = index === 0
        return (
          <Grid sx={{ xs: 12, sm: 6, md: 3 }}  key={index}>
            <Card
              sx={{
                height: 140,
                background: isMainCard ? stat.bgColor : "#fff",
                color: isMainCard ? "#fff" : "#2c3e50",
                border: stat.border ? "1px solid #f0f0f0" : "none",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <CardContent sx={{ p: 3, height: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 2 }}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isMainCard ? "rgba(255,255,255,0.8)" : "text.secondary",
                        fontSize: "0.85rem",
                        mb: 1,
                      }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        fontSize: "2.5rem",
                        lineHeight: 1,
                        color: isMainCard ? "#fff" : "#2c3e50",
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      backgroundColor: isMainCard ? "rgba(255,255,255,0.2)" : `${stat.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon sx={{ fontSize: 24, color: isMainCard ? "#fff" : stat.color }} />
                  </Box>
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: isMainCard ? "rgba(255,255,255,0.7)" : "text.secondary",
                    fontSize: "0.75rem",
                  }}
                >
                  {stat.subtitle}
                </Typography>
                {isMainCard && (
                  <LinearProgress
                    variant="determinate"
                    value={stat.progress}
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      backgroundColor: "rgba(255,255,255,0.2)",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#fff",
                      },
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}

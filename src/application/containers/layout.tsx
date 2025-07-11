import { useState } from "react"
import { useAppSelector } from "../hooks/useAppSelector"
import { Box, AppBar, Toolbar, Typography, IconButton, CircularProgress } from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"
import { Sidebar } from "../components/dashboard/sidebar"
import { Outlet } from 'react-router-dom'

const drawerWidth = 240

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    )
  }
  if (!isAuthenticated) {
    // No renderizar nada si no está autenticado (la ruta privada ya redirige)
    return null;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          display: { md: "none" },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "background.default",
          pt: { xs: 7, md: 0 },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

import { useNavigate, useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector"
import { logoutSuccess } from "../../store/slices/authSlice"
import { signOut } from 'firebase/auth';
import { auth } from '../../../persistence/api/firebase';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  Inventory as ProductsIcon,
  People as UsersIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
} from "@mui/icons-material"

const drawerWidth = 240

interface SidebarProps {
  mobileOpen: boolean
  handleDrawerToggle: () => void
}

export function Sidebar({ mobileOpen, handleDrawerToggle }: SidebarProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: { auth: any }) => state.auth)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
    { name: "Products", href: "/dashboard/products", icon: ProductsIcon },
    { name: "Users", href: "/dashboard/users", icon: UsersIcon },
  ]

  const generalItems = [
    { name: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
    { name: "Help", href: "/dashboard/help", icon: HelpIcon },
  ]

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logoutSuccess());
    navigate("/login");
  }

  const handleNavigation = (href: string) => {
    navigate(href)
    if (isMobile) {
      handleDrawerToggle()
    }
  }

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#fff" }}>
      {/* Logo */}
      <Box sx={{ p: 3, borderBottom: "1px solid #f0f0f0" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#2d5a3d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: "white", fontWeight: 700 }}>
              D
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#2c3e50" }}>
            Donezo
          </Typography>
        </Box>
      </Box>

      {/* Menu Section */}
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, px: 2, py: 1, display: "block" }}>
          MENU
        </Typography>
        <List sx={{ py: 0 }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.href)}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    backgroundColor: isActive ? "#2d5a3d" : "transparent",
                    color: isActive ? "white" : "text.primary",
                    "&:hover": {
                      backgroundColor: isActive ? "#2d5a3d" : "rgba(45, 90, 61, 0.08)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: isActive ? "white" : "#6c757d", minWidth: 40 }}>
                    <Icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontSize: "0.9rem",
                      fontWeight: isActive ? 600 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Box>

      {/* General Section */}
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, px: 2, py: 1, display: "block" }}>
          GENERAL
        </Typography>
        <List sx={{ py: 0 }}>
          {generalItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.href)}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    backgroundColor: isActive ? "#2d5a3d" : "transparent",
                    color: isActive ? "white" : "text.primary",
                    "&:hover": {
                      backgroundColor: isActive ? "#2d5a3d" : "rgba(45, 90, 61, 0.08)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: isActive ? "white" : "#6c757d", minWidth: 40 }}>
                    <Icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontSize: "0.9rem",
                      fontWeight: isActive ? 600 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      {/* User info and logout */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Avatar sx={{ width: 36, height: 36, mr: 2, bgcolor: "#2d5a3d", fontSize: "0.9rem" }}>
            {user?.name?.charAt(0)}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.85rem" }}>
              {user?.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
              {user?.email}
            </Typography>
          </Box>
          <IconButton onClick={handleLogout} size="small" sx={{ color: "#6c757d" }}>
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAppDispatch } from "../../../hooks/useAppSelector"
import { addUser, updateUser, fetchUsers } from "../../../store/slices/userSlice"
import type { User } from "../../../../domain/usuarios/objects/user"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material"

interface UserDialogProps {
  isOpen: boolean
  onClose: () => void
  user?: User | null
}

export function UserDialog({ isOpen, onClose, user }: UserDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user" as "admin" | "user",
    status: "active" as "active" | "inactive",
  })

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (user) {
      const roleValue = user.role === "admin" ? "admin" : "user"
      const statusValue = user.status === "inactive" ? "inactive" : "active"
      setFormData({
        name: user.name,
        email: user.email,
        role: roleValue,
        status: statusValue,
      })
    } else {
      setFormData({
        name: "",
        email: "",
        role: "user",
        status: "active",
      })
    }
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const userData: User = {
      id: user?.id || Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
      createdAt: user?.createdAt || new Date().toISOString().split("T")[0],
    }

    if (user) {
      dispatch(updateUser(userData)).then(() => dispatch(fetchUsers()))
    } else {
      dispatch(addUser(userData)).then(() => dispatch(fetchUsers()))
    }

    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{user ? "Edit User" : "Add New User"}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid sx={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>

            <Grid sx={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Grid>

            <Grid sx={{ xs: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={formData.role}
                  label="Role"
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as "admin" | "user" })}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid sx={{ xs: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Status"
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {user ? "Update" : "Create"} User
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

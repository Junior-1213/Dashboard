"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppSelector"
import { addProduct, updateProduct, fetchProducts } from "../../../store/slices/productSlice"
import type { Product } from "../../../../domain/productos/objects/product"
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

interface ProductDialogProps {
  isOpen: boolean
  onClose: () => void
  product?: Product | null
}

export function ProductDialog({ isOpen, onClose, product }: ProductDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    status: "active" as "active" | "inactive",
  })

  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        stock: product.stock.toString(),
        status: product.status as "active" | "inactive",
      })
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        status: "active",
      })
    }
  }, [product])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id) return;

    const productData: Product = {
      id: product?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      category: formData.category,
      stock: Number.parseInt(formData.stock),
      status: formData.status,
      createdAt: product?.createdAt || new Date().toISOString().split("T")[0],
    }

    if (product) {
      dispatch(updateProduct({ userId: user.id, product: productData })).then(() => dispatch(fetchProducts(user.id)))
    } else {
      dispatch(addProduct({ userId: user.id, product: productData })).then(() => dispatch(fetchProducts(user.id)))
    }

    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid sx={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>

            <Grid sx={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Grid>

            <Grid sx={{ xs: 6 }}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                inputProps={{ step: "0.01" }}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </Grid>

            <Grid sx={{ xs: 6 }}>
              <TextField
                fullWidth
                label="Stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
              />
            </Grid>

            <Grid sx={{ xs: 6 }}>
              <TextField
                fullWidth
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
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
            {product ? "Update" : "Create"} Product
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

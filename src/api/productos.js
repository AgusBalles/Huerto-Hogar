// src/api/productos.js
import client from './client';

export const getProductos = (params = {}) => client.get('/api/productos', { params });
export const getProducto = (id) => client.get(`/api/productos/${id}`);

// Ensure we don't send an `id` when creating a product (backend generates it)
export const createProducto = (data) => client.post('/api/productos', data);

export const updateProducto = (id, data) => client.put(`/api/productos/${id}`, data);
export const deleteProducto = (id) => client.delete(`/api/productos/${id}`);

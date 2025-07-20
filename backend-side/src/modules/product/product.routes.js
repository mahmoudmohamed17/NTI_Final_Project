import express from "express";
import { addProduct, deleteProduct, getProducts, updateProduct } from "./product.controller.js";

export const productRoutes = express.Router();

productRoutes.get("/products", getProducts);
productRoutes.post("/products", addProduct);
productRoutes.put("/products/:id", updateProduct);
productRoutes.delete("/products/:id", deleteProduct);

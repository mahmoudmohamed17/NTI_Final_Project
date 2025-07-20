import express from "express";
import { addToCart, clearCart, getUserCart, removeFromCart, updateCartItem } from "./cart.controller.js";

export const cartRoutes = express.Router();

cartRoutes.get("/cart", getUserCart);
cartRoutes.post("/cart", addToCart);
cartRoutes.put("/cart/:id", updateCartItem);
cartRoutes.delete("/cart/:id", removeFromCart);
cartRoutes.delete("/cart", clearCart);

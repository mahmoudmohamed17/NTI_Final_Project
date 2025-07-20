import express from "express";
import { createOrder, deleteOrderById, getOrderById, getUserOrders } from "./order.controller.js";

export const orderRoutes = express.Router();

orderRoutes.get("/orders", getUserOrders);
orderRoutes.get("/orders/:id", getOrderById);
orderRoutes.post("/orders", createOrder);
orderRoutes.delete("/orders/:id", deleteOrderById);

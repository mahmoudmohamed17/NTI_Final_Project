import express from "express";
import { deleteUser,  signUp, signIn, updateUser, getUsers, getUser} from "./user.controller.js";
import { checkEmail } from "../../middlewares/checkEmail.js";
import { verifyToken } from "../../middlewares/verifyToken.js";

export const userRoutes = express.Router();

userRoutes.get("/users", getUsers);
userRoutes.get("/users/:id", getUser);
userRoutes.post("/users/signup", checkEmail, signUp);
userRoutes.post("/users/signin", signIn);
userRoutes.put("/users/:id", verifyToken, updateUser);
userRoutes.delete("/users/:id", verifyToken, deleteUser);

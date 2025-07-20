import { userModel } from "../../../db/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let getUsers = async (req, res) => {
    try {
        let users = await userModel.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error when retrieving users data." });
    }
};

let getUser = async (req, res) => {
    try {
        let user = await userModel.findById(req.params.id).select("-password");
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error when retrieving user data." });
    }
};

let signUp = async (req, res) => {
    try {
        let registeredUser = await userModel.insertOne(req.body);
        let { password: _, ...userData } = registeredUser._doc;
        res.json({ message: "User registered successfully!", user: userData });
    } catch (error) {
        res.status(500).json("Error registering the user.");
    }
};

let signIn = async (req, res) => {
    try {
        let foundedUser = await userModel.findOne({ email: req.body.email });
        if (foundedUser) {
            let matchedPassword = await bcrypt.compare(req.body.password, foundedUser.password);
            if (matchedPassword) {
                let token = jwt.sign(
                    {
                        _id: foundedUser._id,
                        name: foundedUser.name,
                        email: foundedUser.email,
                        age: foundedUser.age,
                        role: foundedUser.role,
                    },
                    "key",
                );
                res.json({ message: "Signed in successfully!", token });
            }
            else {
                res.status(401).json({ message: "Invalid credentials." });
            }
        }
        else {
            res.status(404).json({ message: "User not found, sign up first." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error signing in, try again later." });
    }
};

let updateUser = async (req, res) => {
    try {
        let updatedUser = await userModel.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true },
        );
        if (updatedUser) {
            res.json({ message: "User updated successfully!", user: updatedUser });
        } else {
            res.status(404).json({ message: "User not found." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating the user, try again later." });
    }
};

let deleteUser = async (req, res) => {
    try {
        let deletedUser = await userModel.findByIdAndDelete(req.params.id);
        if (deletedUser) {
            res.json({ message: "User deleted successfully!" });
        } else {
            res.json({ message: "User not found." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting the user, try again later." });
    }
};

export {
    getUsers,
    getUser,
    signUp,
    signIn,
    updateUser,
    deleteUser
};

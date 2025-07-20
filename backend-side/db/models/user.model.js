import mongoose, {model, Schema} from "mongoose";

const userSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        age: Number,
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const userModel = model("User", userSchema);

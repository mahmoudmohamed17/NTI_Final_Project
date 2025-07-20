import mongoose, { model, Schema } from "mongoose";

const cartSchema = new Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            unique: true,
        },
        items: [
            {
                product: {
                    type: mongoose.Types.ObjectId,
                    ref: "Product",
                },
                quantity: {
                    type: Number,
                    min: 1,
                    default: 1,
                }
            }
        ],
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const cartModel = model("Cart", cartSchema);

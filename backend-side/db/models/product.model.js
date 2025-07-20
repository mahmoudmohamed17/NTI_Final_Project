import mongoose, {model, Schema} from "mongoose";

const productSchema = new Schema(
    {
        name: String,
        price: Number,
        description: String,
        image: String,
        category: String,
        rate: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const productModel = model("Product", productSchema);

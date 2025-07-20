import { productModel } from "../../../db/models/product.model.js";


let getProducts = async (req, res) => {
    try {
        let products = await productModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error loading the products" });
    }
};

let addProduct = async (req, res) => {
    try {
        let isFounded = await productModel.findOne({ name: req.body.name });
        if (isFounded) {
            res.status(409).json({ message: "A product with similar name is already found." });
        } else {
            let product = await productModel.insertOne(req.body);
            res.json({ message: "Product added successfully!", product });
        }
    } catch (error) {
        res.status(500).json({ message: "Error when adding the product, try again later." });
    }
};

let updateProduct = async (req, res) => {
    try {
        let product = await productModel.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true });
        if (product) {
            res.json({ message: "Product updated successfully!", product });
        } else {
            res.status(404).json({ message: "Product not found." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error when updating the product, try again later." });
    }
};

let deleteProduct = async (req, res) => {
    try {
        let product = await productModel.findByIdAndDelete(req.params.id);
        if (product) {
            res.json({ message: "Product deleted successfully!" });
        } else {
            res.status(404).json({ message: "Product not found." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error when deleting the product, try again later." });
    }
};

export {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
};

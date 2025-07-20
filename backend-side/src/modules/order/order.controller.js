import { orderModel } from "../../../db/models/order.model.js";
import { productModel } from "../../../db/models/product.model.js";

let createOrder = async (req, res) => {
    const { user, items, shippingAddress } = req.body;
    try {
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "There's no products found." });
        }
        let totalPrice = 0;
        for (const item of items) {
            const dbProduct = await productModel.findById(item.product);
            if (!dbProduct) {
                return res.status(404).json({ message: "Product is not found" });
            }
            totalPrice += dbProduct.price * item.quantity;
        }
        const order = await orderModel.insertOne(
            {
                user: user,
                items: items,
                shippingAddress: shippingAddress,
                totalPrice: totalPrice,
            }
        );
        res.status(201).json({ message: "Order has been created successfully!", order: order });
    } catch (error) {
        res.status(500).json({ message: "Error occured when creating the order.", error });
    }
};

let getUserOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ user: req.body.user }).populate("items");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error occured when fetching the orders." });
    }
};

let getOrderById = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id).populate("products.product");
        if (!order) return res.status(404).json({ message: "Order not found." });
        if (order.user != req.user)
            return res.status(403).json({ message: "You're not allowed to access this order." });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error occured when fetching order details." });
    }
};

let deleteOrderById = async (req, res) => {
    try {
        let item = await orderModel.findOne({_id: req.params.id});
        if(!item) return res.status(409).json({message: "Order not found."});
        if(item.user != req.body.user)
            return res.status(403).json({message: "You're not allowed to delete this order."}); 
        await orderModel.findOneAndDelete({_id: req.params.id});
        res.json({message: "Order deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: "Error deleting the order."});
    }
};

export {
    createOrder,
    getUserOrders,
    getOrderById,
    deleteOrderById,
};

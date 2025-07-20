import { userModel } from "../../db/models/user.model.js";
import bcrypt from "bcrypt";

export const checkEmail = async (req, res, next) => {
    try {
        let foundedUser = await userModel.findOne({ email: req.body.email });
        if (foundedUser) {
            res.status(409).json({ message: "A user with the same email is already registered." });
        } else {
            req.body.password = await bcrypt.hash(req.body.password, 8);
            next();
        }
    } catch (error) {
        res.status(500).json({ message: "An error occured when checking the user email." });
    }
}

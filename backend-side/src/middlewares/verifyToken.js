import jwt from "jsonwebtoken";

// This action done before most of requests
export const verifyToken = async (req, res, next) => {
    let { token } = await req.headers;
    jwt.verify(token, "key", (err, decoded) => {
        if (err) {
            res.status(400).json({ message: err });
        } else {
            res.body = decoded;
            next();
        }
    });
};

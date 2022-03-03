const jwt = require("jsonwebtoken");

const User = require("../models/AuthModel")

const authentic = async (req, res, next) => {
    try {
        const btoken = req.header("authorization");
        if (!btoken) {
            return res.status(500).json({ err: "Token is required" });
        }
        const token = btoken.replace("Bearer ", "");
        const vtoken = await jwt.verify(token, "Helloworld");
        if (!vtoken) {
            return res.status(500).send("invalid token");
        }
        const user = await User.findById({ _id: vtoken.id });
        if (!user) {
            return res.status(500).json({ err: "User not found" });
        }
        req.userid = user._id;
        req.user = user;
        req.token = token;
        next();
    } catch {
        res.status(401).json({
            error: "Token is expired",
        });
    }
};

module.exports = authentic;
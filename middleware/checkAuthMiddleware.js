const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decoded;
        next();
    } catch (e) {
        return res.status(401).json({
            success: false,
            status: 401,
            message: "Auth Failed"
        });
    }
};

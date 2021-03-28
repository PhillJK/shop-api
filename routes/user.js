const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Athentication related imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAutheMiddleware = require("../middleware/checkAuthMiddleware");

//Models related imports
const User = require("../models/user.model");

//POST /user/signup : Create a new user
router.post("/signup", (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(401).json({
            success: false,
            status: 401,
            message: "Email and password is required"
        });
    }

    const { email, password } = req.body;

    User.findOne({ email })
        .exec()
        .then(data => {
            //Verify that the user does not exist
            if (data.length > 0) {
                const error = new Error("Email already exists");
                error.status = 409;
                throw error;
            } else {
                //Hash the password
                return bcrypt.hash(password, 10);
            }
        })
        .then(hash => {
            //Create the user
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                email,
                password: hash
            });

            user.save();
        })
        .then(() => {
            res.status(201).json({
                success: true,
                status: 201,
                message: "User has been created"
            });
        })
        .catch(err => {
            console.error(err);

            const statusCode = err.status || 500;
            const message = err.message || "Failed to create the user";
            res.status(statusCode).json({
                success: false,
                status: statusCode,
                message
            });
        });
});

// POST /user/signin : Authentication
router.post("/signin", (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(401).json({
            success: false,
            status: 401,
            message: "Email and password is required"
        });
    }

    const { email, password } = req.body;

    User.findOne({ email })
        .exec()
        .then(data => {
            //Check if the user exists
            if (!data) {
                const error = new Error("User does not exists");
                error.status = 401;
                throw error;
            } else {
                //Compare passwords
                const result = bcrypt.compare(password, data.password);
                return { result, data };
            }
        })
        .then(({ result: isComparisonSuccessed, data: user }) => {
            if (isComparisonSuccessed) {
                const token = jwt.sign(
                    { email: user.email, userId: user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Auth successed",
                    token
                });
            } else {
                res.status(401).json({
                    success: false,
                    status: 401,
                    message: "Auth failed"
                });
            }
        })
        .catch(err => {
            console.error(err);

            const statusCode = err.status || 500;
            const message = err.message || "Auth failed";
            res.status(statusCode).json({
                success: false,
                status: statusCode,
                message
            });
        });
});

// DELETE  /user/:userId : Delete existing user
router.delete("/:userId", checkAutheMiddleware, (req, res, next) => {
    const { userId } = req.params;

    User.deleteOne({ _id: userId })
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                status: 200,
                message: "User was deleted"
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                success: false,
                status: 500,
                message: "Failed to delete the user"
            });
        });
});

module.exports = router;

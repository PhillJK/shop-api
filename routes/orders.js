const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Models related imports
const Order = require("../models/order.model");
const Product = require("../models/product.model");

//GET /orders : Find and send all orders
router.get("/", (req, res, next) => {
    Order.find({})
        .select("_id product quantity")
        .populate("product", "_id productName price")
        .exec()
        .then(data =>
            res.status(200).json({
                success: true,
                status: 200,
                message: "Orders was retrieved",
                count: data.length,
                data: data
            })
        )
        .catch(err => {
            console.error(err);
            res.status(500).json({
                success: false,
                status: 500,
                message: "Failed to get orders",
                err
            });
        });
});

//POST /orders : Create a new Order
router.post("/", (req, res, next) => {
    //Check if the productId exists
    if (!req.body.productId) {
        return res.status(400).json({
            success: false,
            status: 400,
            message: "Please specify productId"
        });
    }

    const { quantity, productId } = req.body;

    //Check if the product exists
    Product.findById({ _id: productId })
        .exec()
        .then(data => {
            if (!data) {
                return res.status(404).json({
                    success: false,
                    status: 404,
                    message: `Product with the id of ${productId} does not exists`
                });
            }

            //Create the order
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity,
                product: productId
            });

            return order.save();
        })
        .then(data =>
            res.status(200).json({
                success: true,
                status: 200,
                message: "Order has been created",
                data
            })
        )
        .catch(err => {
            console.error(err);
            res.status(500).json({
                success: false,
                status: 500,
                message: "Failed to create an order",
                err
            });
        });
});

// GET /orders/:id : Find by id and send the order
router.get("/:id", (req, res, next) => {
    const { id } = req.params;

    Order.findById({ _id: id })
        .select("_id product quantity")
        .populate("product", "_id productName price")
        .exec()
        .then(data => {
            //Check if the order with the ID exists, otherwise send 404 error
            if (data) {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: `Order with the id of ${id} was retrieved`,
                    data
                });
            } else {
                res.status(404).json({
                    success: false,
                    status: 404,
                    message: `Order with the id of ${id} is not found`
                });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                success: false,
                status: 500,
                message: `Failed to get the order with id of ${id}`
            });
        });
});

// DELETE /orders/:id : Find by id and delete the order
router.delete("/:id", (req, res, next) => {
    const { id } = req.params;

    Order.findByIdAndDelete({ _id: id })
        .select("_id product quantity")
        .populate("product", "_id productName")
        .exec()
        .then(data => {
            //Check if the order with the ID exists, otherwise send 404 error
            if (data) {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: `Order with the id of ${id} was deleted`,
                    data
                });
            } else {
                res.status(404).json({
                    success: false,
                    status: 404,
                    message: `Order with the id of ${id} not found`
                });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                success: false,
                status: 500,
                message: `Failed to delete the product with the id of ${id}`,
                err
            });
        });
});

module.exports = router;

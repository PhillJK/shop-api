const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Models realted imports
const Product = require("../models/product.model");

// GET /products
router.get("/", (req, res, next) => {
    //Get all products and send them
    Product.find({})
        .exec()
        .then(products =>
            res.status(200).json({
                status: 200,
                message: "Products was retrieved",
                data: products
            })
        )
        .catch(err => {
            console.error(err);
            res.status(500).json({
                status: 500,
                message: "Failed to get products",
                err
            });
        });
});

// POST /products
router.post("/", (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({
            status: 400,
            message: "Request body is empty"
        });
    }

    const { productName, price } = req.body;

    //Create a product
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        productName,
        price
    });

    //Save a product and send it
    product
        .save()
        .then(data =>
            res.status(200).json({
                status: 200,
                message: "Product has been created",
                data
            })
        )
        .catch(err => {
            console.error(err);
            res.status(500).json({
                status: 500,
                message: "Failed to create product",
                err
            });
        });
});

// GET /products/:id
router.get("/:id", (req, res, next) => {
    const { id } = req.params;

    //Find product by ID and send it
    Product.findById(id)
        .exec()
        .then(data => {
            //Check if the product with the ID exists, otherwise send 404 error
            if (data) {
                res.status(200).json({
                    status: 200,
                    message: `Product with the id of ${id} was retrieved`,
                    data
                });
            } else {
                res.status(404).json({
                    status: 404,
                    message: `Product with the id of ${id} not found`
                });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                status: 500,
                message: `Failed to get the product with the id of ${id}`,
                err
            });
        });
});

// PATCH /products/:id
router.patch("/:id", (req, res, next) => {
    const { id } = req.params;
    // const updateOps = {};
    // for (const ops of req.body) {
    //     updateOps[ops.propname] = ops.value;
    // }
    if (!req.body) {
        return res
            .status(400)
            .json({ status: 400, message: "Request body is empty" });
    }
    Product.findByIdAndUpdate(
        { _id: id },
        { $set: req.body },
        { new: true, runValidators: true }
    )
        .exec()
        .then(data => {
            res.status(200).json({
                message: `Product with id of ${id} was updated`,
                data
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                status: 500,
                message: `Failed to update product with id of ${id}`,
                err
            });
        });
});

// DELETE /products/:id
router.delete("/:id", (req, res, next) => {
    const { id } = req.params;
    //Delete the product with certain ID
    Product.findByIdAndDelete({ _id: id })
        .exec()
        .then(data => {
            //Check if the product with the ID exists, otherwise send 404 error
            if (data) {
                res.status(200).json({
                    status: 200,
                    message: `Product with the id of ${id} was deleted`,
                    data
                });
            } else {
                res.status(404).json({
                    status: 404,
                    message: `Product with the id of ${id} not found`
                });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                status: 500,
                message: `Failed to delete the product with the id of ${id}`,
                err
            });
        });
});

module.exports = router;

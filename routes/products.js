const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Models realted imports
const Product = require("../models/product.model");

// GET /products
router.get("/", (req, res, next) => {
    //Find and send products
    Product.find({})
        .then(products =>
            res
                .status(200)
                .json({ message: "Products retrieved", data: products })
        )
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Cannot retrieve products", err });
        });
});

// POST /products
router.post("/", (req, res, next) => {
    const { productName, price } = req.body;

    //Create a product
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        productName,
        price
    });

    //Save a product
    product.save().catch(err => {
        console.error(err);
        res.status(500).json({ message: "Cannot save", err });
    });

    //Send a response
    res.status(201).json({
        message: "Product has been created",
        createdProduct: product
    });
});

// GET /products/:id
router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: `GET /products/${id}`
    });
});

// PATCH /products/:id
router.patch("/:id", (req, res, next) => {
    res.status(200).json({
        message: `PATCH /products/${req.params.id} Updated the product`
    });
});

// DELETE /products/:id
router.delete("/:id", (req, res, next) => {
    res.status(200).json({
        message: `DELETE /products/${req.params.id} Deleted the product`
    });
});

module.exports = router;

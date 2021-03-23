const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Middlewares
const uploadMiddleware = require("../middleware/uploadMiddleware");

//Models realted imports
const Product = require("../models/product.model");

// GET /products : Find and send all available products
router.get("/", (req, res, next) => {
    Product.find({})
        .select("productName productImage price _id")
        .exec()
        .then(data =>
            res.status(200).json({
                success: true,
                status: 200,
                message: "Products was retrieved",
                count: data.length,
                data
            })
        )
        .catch(err => {
            console.error(err);
            res.status(500).json({
                success: false,
                status: 500,
                message: "Failed to get products",
                err
            });
        });
});

// POST /products : Create a new product
router.post("/", uploadMiddleware.single("productImage"), (req, res, next) => {
    if (!req.body.productName || !req.body.price) {
        return res.status(400).json({
            success: false,
            status: 400,
            message: "Request body is empty or does not contain required data"
        });
    }

    const { productName, price } = req.body;

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        productName,
        price,
        productImage: req.file.path
    });

    product
        .save()
        .then(data =>
            res.status(200).json({
                success: true,
                status: 200,
                message: "Product has been created",
                data
            })
        )
        .catch(err => {
            console.error(err);
            res.status(500).json({
                success: false,
                status: 500,
                message: "Failed to create a product",
                err
            });
        });
});

// GET /products/:id : Find by id and send the product
router.get("/:id", (req, res, next) => {
    const { id } = req.params;

    Product.findById(id)
        .select("productName productImage price _id")
        .exec()
        .then(data => {
            //Check if the product with the ID exists, otherwise send 404 error
            if (data) {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: `Product with the id of ${id} was retrieved`,
                    data
                });
            } else {
                res.status(404).json({
                    success: false,
                    status: 404,
                    message: `Product with the id of ${id} is not found`
                });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                success: false,
                status: 500,
                message: `Failed to get the product with the id of ${id}`,
                err
            });
        });
});

// PATCH /products/:id : Find and update properties of the existing product
router.patch("/:id", (req, res, next) => {
    const { id } = req.params;

    if (!req.body) {
        return res.status(400).json({
            success: false,
            status: 400,
            message: "Request body is empty"
        });
    }
    Product.findByIdAndUpdate(
        { _id: id },
        { $set: req.body },
        { new: true, runValidators: true }
    )
        .exec()
        .then(data => {
            // Check if the product with the ID exists, otherwise send 404 error
            if (data) {
                res.status(200).json({
                    success: false,
                    status: 200,
                    message: `Product with id of ${id} was updated`,
                    data
                });
            } else {
                res.status(404).json({
                    success: false,
                    status: 404,
                    message: `Product with the id of ${id} is not found`
                });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                success: false,
                status: 500,
                message: `Failed to update product with id of ${id}`,
                err
            });
        });
});

// DELETE /products/:id : Delete the product with certain ID
router.delete("/:id", (req, res, next) => {
    const { id } = req.params;

    Product.findByIdAndDelete({ _id: id })
        .select("_id productName productIamge price")
        .exec()
        .then(data => {
            //Check if the product with the ID exists, otherwise send 404 error
            if (data) {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: `Product with the id of ${id} was deleted`,
                    data
                });
            } else {
                res.status(404).json({
                    success: false,
                    status: 404,
                    message: `Product with the id of ${id} not found`
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

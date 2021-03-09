const express = require("express");
const router = express.Router();

// GET /products
router.get("/", (req, res, next) => {
    res.status(200).json({ hello: "it's products page, Get method" });
});

// POST /products
router.post("/", (req, res, next) => {
    const product = ({ productName, price } = req.body);
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

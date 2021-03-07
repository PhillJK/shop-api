const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({ hello: "it's products page, Get method" });
});

router.post("/", (req, res, next) => {
    res.status(201).json({ hello: "it's products page, Post method" });
});

router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: `GET /products/${id}`
    });
});

router.patch("/:id", (req, res, next) => {
    res.status(200).json({
        message: `PATCH /products/${req.params.id} Updated the product`
    });
});

router.delete("/:id", (req, res, next) => {
    res.status(200).json({
        message: `DELETE /products/${req.params.id} Deleted the product`
    });
});

module.exports = router;

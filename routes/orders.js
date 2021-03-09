const express = require("express");
const router = express.Router();

//GET /orders
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "GET /orders"
    });
});

//POST /orders
router.post("/", (req, res, next) => {
    const order = ({ productId, quantity } = req.body);
    res.status(201).json({
        message: "Order was created",
        createdOrder: order
    });
});

// GET /orders/:id
router.get("/:id", (req, res, next) => {
    res.status(200).json({
        message: `GET /orders/${req.params.id}`
    });
});

// DELETE /orders/:id
router.delete("/:id", (req, res, next) => {
    res.status(200).json({
        message: `DELETE /orders/${req.params.id} Order was deleted`
    });
});

module.exports = router;

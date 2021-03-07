const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "GET /orders"
    });
});

router.post("/", (req, res, next) => {
    res.status(201).json({
        message: "POST /orders Order was created"
    });
});

router.get("/:id", (req, res, next) => {
    res.status(200).json({
        message: `GET /orders/${req.params.id}`
    });
});

router.patch("/:id", (req, res, next) => {
    res.status(200).json({
        message: `PATCH /orders/${req.params.id} Updated order`
    });
});

router.delete("/:id", (req, res, next) => {
    res.status(200).json({
        message: `DELETE /orders/${req.params.id} Order was deleted`
    });
});

module.exports = router;

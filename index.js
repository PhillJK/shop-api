require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3000;

const productsRoutes = require("./routes/products");
const ordersRouter = require("./routes/orders");

const mongoose = require("mongoose");

//connect to db
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to db");
    })
    .catch(err => console.error(err));

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/products", productsRoutes);
app.use("/orders", ordersRouter);

//error handling middlewares
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

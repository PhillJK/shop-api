require("dotenv").config();

const path = require("path");

//Express setup
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

//Routes related imports
const productsRoutes = require("./routes/products");
const ordersRouter = require("./routes/orders");

//Middleware related imports
const morgan = require("morgan");
const corsMiddleware = require("./middleware/corsMiddleware");
const createErrorMiddleware = require("./middleware/createErrorMiddleware");
const sendErrorMiddleware = require("./middleware/sendErrorMiddleware");

//DB related imports
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
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));
app.use(corsMiddleware);

//routes
app.use("/products", productsRoutes);
app.use("/orders", ordersRouter);

//error handling middlewares
app.use(createErrorMiddleware);
app.use(sendErrorMiddleware);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

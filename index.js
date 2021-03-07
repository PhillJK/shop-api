require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

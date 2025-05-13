const express = require('express');
const router = require("./src/routes/api");
const app = new express();
const bodyParser = require('body-parser');

//secuirity middlware
const rateLimit = require("express-rate-limit");
const helmet = require('helmet');
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
//databse
const mongoose = require('mongoose');
//secuirity middlware implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// body-parser-implement
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true })); // Parses form data
//request rate limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 })
app.use(limiter);

//mongodbconnection
//let URI = "mongodb://127.0.0.1:27017/ToDo";




async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/ToDo");
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ Connection failed:", error);
    }
}

connectDB();

//routing implement
app.use("/api/v1" , router);



//udefind routing
// app.use((req, res) => {
//     res.status(404).json({
//         status: "fail",
//         data: "Not found"
//     });
// });
module.exports =app




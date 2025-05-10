const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
const router = require("./src/router/TodoRoutes");
const AuthRouter = require("./src/router/AuthRoutes")
const port = process.env.MONGO_URI || 4001; 


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

require('dotenv').config();
    mongoose.connect(process.env.MONGO_URI
)
    .then(() => console.log("MongoDB connection successful"))
    .catch((err) => console.log("MongoDB error:", err));


app.use(router);
app.use(AuthRouter);

app.get("/", (req, res) => {
    res.status(200).send("I am Runner");
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

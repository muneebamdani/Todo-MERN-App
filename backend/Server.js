const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
const router = require("./src/router/TodoRoutes");
const AuthRouter = require("./src/router/AuthRoutes")
const port =process.env.PORT||  4001
//   
// 4001

// "https://todo-mern-app-frontend-mu.vercel.app"
// "http://localhost:5173",
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin:   "https://todo-mern-app-frontend-mu.vercel.app", // allow your Vite frontend  
  methods: ["GET", "POST", "PUT", "DELETE"], // adjust as needed
  credentials: true
}))

require('dotenv').config();
    mongoose.connect(process.env.MONGO_URI,
         {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
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

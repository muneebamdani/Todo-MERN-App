const express = require("express");
const router = express.Router();
const {Singup} = require("../Controllers/AuthController")


router.post("/signup", Singup);



module.exports = router;
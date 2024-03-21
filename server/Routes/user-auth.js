const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController"); // importing the user controller 

router.post("/sign-up", userController.registerUser);
router.post("/login", userController.loginUser);


module.exports = router;
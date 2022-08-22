const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const auth = require("../middleware/authJwt");
const { UserController } = require("../controllers");

router.post("/user/signup", auth, asyncHandler(UserController.register));
router.post("/user/login", auth, asyncHandler(UserController.login));

module.exports = router;

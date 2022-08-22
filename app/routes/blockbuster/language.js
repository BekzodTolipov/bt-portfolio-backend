// Movie Rental route
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const { LanguageController } = require("../../controllers");

router.get("/languages", asyncHandler(LanguageController.getAllLanguages));
router.post("/languages", asyncHandler(LanguageController.addLanguages));

module.exports = router;

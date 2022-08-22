// Movie Rental route
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const { FilmController } = require("../../controllers");

router.get("/films", asyncHandler(FilmController.getAllFilms));
router.post("/films", asyncHandler(FilmController.addFilms));

module.exports = router;

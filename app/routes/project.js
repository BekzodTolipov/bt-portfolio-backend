const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const { ProjectController } = require("../controllers");

router.get("/", asyncHandler(ProjectController.getProjects));
router.post("/save-project", asyncHandler(ProjectController.saveProject));
module.exports = router;

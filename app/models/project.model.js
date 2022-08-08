const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: String,
    content: [],
});

module.exports = mongoose.model("Project", projectSchema);

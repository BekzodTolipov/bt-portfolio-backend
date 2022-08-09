const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
    title: String,
    content: [],
});

module.exports = mongoose.model("Education", educationSchema);

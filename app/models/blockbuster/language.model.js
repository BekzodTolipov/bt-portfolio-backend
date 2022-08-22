const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema({
    name: String,
    last_update: Date,
});

module.exports = mongoose.model("Language", languageSchema);

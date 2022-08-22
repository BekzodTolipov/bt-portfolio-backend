const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema({
    title: String,
    description: String,
    release_year: String,
    language_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
    },
    rental_rate: Number,
    length: Number,
    replacement_cost: {
        type: Number,
        set: function (value) {
            value.toFixed(2);
        },
    },
    rating: String,
    last_updated: Date,
    special_features: String,
    fulltext: String,
});

module.exports = mongoose.model("Film", filmSchema);

const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    title: String,
    description: String,
    image: String,
    imageBig: String,
    lessons: [String],
});

module.exports = mongoose.model("Course", courseSchema);
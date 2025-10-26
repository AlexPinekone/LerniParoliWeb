const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema({
    idCourse: String,
    title: String,
    description: String,
    image: String,
    theoryId: String,
    practiceId: String
});

module.exports = mongoose.model("Lesson", lessonSchema);
const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema({
    idLesson: String,
    idCourse: String,
    username: String,
    status: String
});

module.exports = mongoose.model("LessonUser", lessonSchema);
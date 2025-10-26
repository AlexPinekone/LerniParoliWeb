const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
}); // _id: false si no quieres ID por cada pregunta

const PracticeSchema = new Schema({
  idCourse: { type: String, required: true },
  idLesson: { type: String, required: true },
  questions: [questionSchema], // ahora es un arreglo de preguntas
});

module.exports = mongoose.model("Practice", PracticeSchema);
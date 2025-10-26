const mongoose = require("mongoose");
const { Schema } = mongoose;

const theoryBlockSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['title', 'subtitle', 'text', 'image', 'code', 'interactive'],
  },
  content: String,
  src: String,
  alt: String,
  language: String,
  component: {
    type: String,
    enum: ['quiz', 'button', 'alert'],
  },
  data: Schema.Types.Mixed,
}, { _id: false }); // Puedes poner _id: true si quieres que cada bloque tenga su propio ID

const theorySchema = new Schema({
  idCourse: { type: String, required: true },
  idLesson: { type: String, required: true },
  title: String,
  blocks: [theoryBlockSchema] // Aquí defines el arreglo de bloques
});

module.exports = mongoose.model("Theory", theorySchema);
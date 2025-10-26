const { request, response } = require("express");
const Theory = require("../models/theory");
const Lesson = require("../models/lesson");
const practice = require("../models/practice");

// Obtener una teoría por idLesson
const getTheoryByLesson = async (req = request, res = response) => {
    const { idLesson } = req.params;

    if (!idLesson) return res.status(400).json({ msg: "ID de lección inválido" });

    try {
        const theory = await Theory.findOne({ idLesson });
        if (!theory) return res.status(404).json({ msg: "Teoría no encontrada" });
        res.status(200).json(theory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

// Crear una nueva teoría
const createTheory = async (req = request, res = response) => {
    const { idCourse, idLesson, blocks, title } = req.body;

    if (!title || !idCourse || !idLesson || !Array.isArray(blocks) || blocks.length === 0) {
        return res.status(400).json({ msg: "Datos incompletos o inválidos" });
    }

    try {
        const newTheory = new Theory({ idCourse, idLesson, blocks, title});
        const savedTheory = await newTheory.save();

        // Agregar el ID de la lección al curso
        const updatedLesson = await Lesson.findByIdAndUpdate(
            idLesson,
            { theoryId: savedTheory._id.toString() },
            { new: true }
        );

        if (!updatedLesson) {
            return res.status(404).json({ msg: "Lección no encontrada para asociar la teoría" });
        }

        res.status(201).json(newTheory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al guardar la teoría" });
    }
};

// Actualizar una teoría existente
const updateTheory = async (req = request, res = response) => {
    const { id } = req.params;
    const { blocks } = req.body;

    if (!id || !Array.isArray(blocks)) {
        return res.status(400).json({ msg: "Datos inválidos" });
    }

    try {
        const updated = await Theory.findByIdAndUpdate(id, { blocks }, { new: true });
        if (!updated) {
            return res.status(404).json({ msg: "Teoría no encontrada" });
        }
        res.status(200).json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar la teoría" });
    }
};

// Eliminar una teoría
const deleteTheory = async (req = request, res = response) => {
    const { id } = req.params;

    try {

        const theory = await Theory.findById(id);
            if (!theory) {
            return res.status(404).json({ msg: "Teoría no encontrada" });
        }

        await Theory.findByIdAndDelete(id);

        await Lesson.findOneAndUpdate(
            { _id: theory.idLesson },
            { $set: { theoryId: null } }
        );
        
        res.status(200).json({ msg: "Teoría eliminada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar la teoría" });
    }
};

module.exports = {
    getTheoryByLesson,
    createTheory,
    updateTheory,
    deleteTheory
};
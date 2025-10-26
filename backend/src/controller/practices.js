const { response, request } = require("express");
const Practice = require("../models/practice");
const Lesson = require("../models/lesson");

// Obtener todas las prácticas
/*
const getPractices = async (req = request, res = response) => {
    try {
        const practices = await Practice.find();
        res.status(200).json(practices);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};*/

// Obtener una práctica específica por ID
const getPractice = async (req = request, res = response) => {
    const { id } = req.params; // Este será el idLesson
    if (!id) return res.status(400).json({ msg: "ID de lección inválido" });

    try {
        const practice = await Practice.findOne({ idLesson: id });
        if (!practice) return res.status(404).json({ msg: "Práctica no encontrada" });
        res.status(200).json(practice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

// Crear una nueva práctica
const createPractice = async (req = request, res = response) => {
    const { idCourse, idLesson, questions } = req.body;

    if (!idCourse || !idLesson || !questions || !Array.isArray(questions)) {
        return res.status(400).json({ msg: "Datos incompletos o inválidos" });
    }

    try {
        const newPractice = new Practice({ idCourse, idLesson, questions });
        const savedPractice = await newPractice.save();

        const updatedLesson = await Lesson.findByIdAndUpdate(
            idLesson,
            { practiceId: savedPractice._id.toString() },
            { new: true }
        );

        if (!updatedLesson) {
            return res.status(404).json({ msg: "Lección no encontrada para asociar la teoría" });
        }

        res.status(201).json(newPractice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al guardar la práctica" });
    }
};

// Actualizar una práctica
const updatePractice = async (req = request, res = response) => {
    const { id } = req.params;
    const { idCourse, idLesson, questions } = req.body;

    try {
        const updated = await Practice.updateOne(
            { _id: id },
            { $set: { idCourse, idLesson, questions } }
        );
        if (updated.modifiedCount === 1) {
            res.status(200).json({ msg: "Práctica actualizada correctamente" });
        } else {
            res.status(404).json({ msg: "Práctica no encontrada o sin cambios" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar la práctica" });
    }
};

// Eliminar una práctica
const deletePractice = async (req = request, res = response) => {
    const { id } = req.params;

    try {

        const practice = await Practice.findById(id);
        if (!practice) {
            return res.status(404).json({ msg: "Práctica no encontrada" });
        }

        await Practice.findByIdAndDelete(id);

        await Lesson.findOneAndUpdate(
            { _id: practice.idLesson },
            { $set: { practiceId: null } }
        );
        
        res.status(200).json({ msg: "Práctica eliminada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar la práctica" });
    }
};

module.exports = {
    getPractice,
    createPractice,
    updatePractice,
    deletePractice,
};
const { request, response } = require("express");
const LessonUser = require("../models/lessonUser");
const Lesson = require("../models/lesson");

// Obtener todas las lecciones de un usuario en un curso
const getLessonUsers = async (req = request, res = response) => {
    const { idCourse, username } = req.params;

    try {
        const lessons = await LessonUser.find({ idCourse, username });
        res.status(200).json(lessons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener los registros" });
    }
};

// Obtener una lección específica para un usuario
const getLessonUserById = async (req = request, res = response) => {
    const { idLesson, username } = req.params;

    try {
        const lesson = await LessonUser.findOne({ idLesson, username });
        if (!lesson) return res.status(404).json({ msg: "Registro no encontrado" });

        res.status(200).json(lesson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener el registro" });
    }
};

// Crear una entrada nueva
const createLessonUser = async (req = request, res = response) => {
    const { idLesson, username } = req.params;
    const { status } = req.body;

    try {
        const lesson = await Lesson.findById(idLesson);
        if (!lesson) {
            return res.status(404).json({ msg: "Lección no encontrada", idLesson });
        }

        const idCourse = lesson.idCourse;

        if (!idCourse || !status) {
            return res.status(400).json({
                msg: "Datos incompletos",
                idCourse,
                status
            });
        }

        const existing = await LessonUser.findOne({ idLesson, username });
        if (existing) {
            return res.status(400).json({ msg: "Ya existe un registro para esta lección y usuario" });
        }

        const newEntry = new LessonUser({ idLesson, username, idCourse, status });
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear el registro" });
    }
};

// Actualizar el estado
const updateLessonUser = async (req = request, res = response) => {
    const { idLesson, username } = req.params;
    const { status } = req.body;

    if (!status) return res.status(400).json({ msg: "Estado requerido" });

    try {
        const updated = await LessonUser.findOneAndUpdate(
            { idLesson, username },
            { $set: { status } },
            { new: true }
        );

        if (!updated) return res.status(404).json({ msg: "Registro no encontrado" });

        res.status(200).json({ msg: "Registro actualizado", data: updated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar" });
    }
};

// Eliminar un registro
const deleteLessonUser = async (req = request, res = response) => {
    const { idLesson, username } = req.params;

    try {
        const deleted = await LessonUser.findOneAndDelete({ idLesson, username });

        if (!deleted) return res.status(404).json({ msg: "Registro no encontrado" });

        res.status(200).json({ msg: "Registro eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar el registro" });
    }
};

module.exports = {
    getLessonUsers,
    getLessonUserById,
    createLessonUser,
    updateLessonUser,
    deleteLessonUser
};
const { response, request } = require("express");
const Course = require("../models/course");

const getCourses = async (req = request, res = response) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

const getCourse = async (req = request, res = response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ msg: "ID inválido" });
    }
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ msg: "Curso no encontrado" });
        }
        res.status(200).json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

const createCourse = async (req = request, res = response) => {
    const { title, description, image, imageBig } = req.body;

    if (!title || !description || !image || !imageBig) {
        return res.status(400).json({ msg: "Datos incompletos" });
    }

    try {
        const newCourse = new Course({ title, description, image, imageBig, lessons: [] });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

const updateCourse = async (req = request, res = response) => {
    const { id } = req.params;
    const { title, description, image, imageBig, lessons } = req.body;

    if (!id) {
        return res.status(400).json({ msg: "ID inválido" });
    }

    try {
        const updated = await Course.updateOne({ _id: id }, { $set: { title, description, image, imageBig, lessons } });
        if (updated.modifiedCount === 1) {
            return res.status(200).json({ msg: "Curso actualizado correctamente" });
        }
        res.status(404).json({ msg: "Curso no encontrado o sin cambios" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

const deleteCourse = async (req = request, res = response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ msg: "ID inválido" });
    }

    try {
        const result = await Course.deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            return res.status(200).json({ msg: "Curso eliminado correctamente" });
        }
        res.status(404).json({ msg: "Curso no encontrado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

module.exports = {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
};

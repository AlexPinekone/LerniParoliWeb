const {response, request} = require("express");
const Lesson = require("../models/lesson");
const Course = require("../models/course");

const getLessons = async (req = request, res = response) => {
    const {id} = req.params;
    if(!id){
        res.status(400).json({
            msg: "Id invalido"
        })
        return;
    }
    try{
        const result = await Lesson.findOne({_id: id})
        if(!result){
            res.status(404).json({
                msg: "Lección no encontrado"
            })
            return;
        }
        res.status(200).json(result);
    }catch(error){
        console.log(error)
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }


    res.status(200).json([]);
}
/*
const getLesson = async (req = request, res = response) => {

    const {id} = req.params;
    if(!id){
        res.status(400).json({
            msg: "Id invalido"
        })
        return;
    }
    try{
        const result = await TvShow.findOne({_id: id})
        if(!result){
            res.status(404).json({
                msg: "TvShow no encontrado"
            })
            return;
        }
        res.status(200).json(result);
    }catch(error){
        console.log(error)
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
    
}*/

const createLesson = async (req = request, res = response) => {
    const { idCourse, title, description, image } = req.body;
    const theoryId = "";
    const practiceId = "";

    if (!idCourse || !title || !image || !description) {
        res.status(404).json({
            msg: "Datos erroneos"
        });
        return;
    }

    try {
        // Crear y guardar la lección
        const newLesson = new Lesson({ idCourse, title, description, image, theoryId, practiceId });
        const savedLesson = await newLesson.save();

        // Agregar el ID de la lección al curso
        const updatedCourse = await Course.findByIdAndUpdate(
            idCourse,
            { $push: { lessons: savedLesson._id.toString() } },
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ msg: "Curso no encontrado para asociar la lección" });
        }

        res.status(201).json(savedLesson);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error interno del servidor"
        });
    }
}
/*
const updateLesson = async (req = request, res = response) => {
    const {id} = req.params;
    if(!id){
        res.status(400).json({
            msg: "Id invalido"
        })
        return;
    }
    const {name, year, image, episodes, description, genre} = req.body;

    if(!name || !year || !image || !episodes || !description || !genre){
        res.status(404).json({
           msg: "Datos incompletos"
       })
        return;
    }
    
    const updatedData = {name, year, image, episodes, description, genre};

    try{
        const result = await TvShow.updateOne({_id: id, updatedData});
        if (result?.modifiedCount === 1){
            res.status(200).json({
                msg: "TvShow modificado"
            });
        }else{
            res.status(404).json({
                msg: "TvShow no encontrado"
            });
        }
    }catch(error){
        console.log(error)
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}

const deleteLesson = async (req = request, res = response) => {
    const {id} = req.params;
    if(!id){
        res.status(400).json({
            msg: "Id invalido"
        })
        return;
    }
    try{
        const result = await TvShow.deleteOne({_id: id});
        if(result?.deltedCount === 1){
            res.status(200).json({
                msg: "TvShow eliminado"
            });
        }else{
            res.status(404).json({
                msg: "TvShow no encontrado"
            })
        }
        
    }catch(error){
        console.log(error)
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }

}
*/
const getLessonsByCourse = async (req = request, res = response) => {
    const { courseId } = req.params;

    if (!courseId) {
        return res.status(400).json({ msg: 'ID de curso inválido' });
    }

    try {
        const lessons = await Lesson.find({ idCourse: courseId });
        res.status(200).json(lessons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

const getLesson = async (req = request, res = response) => {
    const { courseId, lessonId } = req.params;

    if (!courseId || !lessonId) {
        return res.status(400).json({ msg: "Parámetros inválidos" });
    }

    try {
        const result = await Lesson.findOne({ idCourse: courseId, _id: lessonId });

    if (!result) {
        return res.status(404).json({ msg: "Lección no encontrada" });
    }

    res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

const updateLesson = async (req = request, res = response) => {
    const {lessonId } = req.params;
    const updatedData = req.body;

    if (!lessonId) {
        return res.status(400).json({ msg: "Parámetros inválidos" });
    }

    try {
    const result = await Lesson.updateOne(
        { _id: lessonId },
        { $set: updatedData }
    );

    if (result.modifiedCount === 1) {
        return res.status(200).json({ msg: "Lección actualizada" });
    } else {
        return res.status(404).json({ msg: "Lección no encontrada o sin cambios" });
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

const deleteLesson = async (req = request, res = response) => {
  const { lessonId } = req.params;

  if (!lessonId) {
    return res.status(400).json({ msg: "Parámetros inválidos" });
  }

  try {
    const result = await Lesson.deleteOne({ _id: lessonId });

     if (result.deletedCount !== 1) {
      return res.status(404).json({ msg: "Lección no encontrada" });
    }

    // Quitar la lección del arreglo de su curso
    const courseUpdate = await Course.updateOne(
      { lessons: lessonId },
      { $pull: { lessons: lessonId } }
    );

    if (courseUpdate.modifiedCount === 0) {
      console.warn("La lección fue eliminada, pero no estaba en el curso.");
    }

    return res.status(200).json({ msg: "Lección eliminada correctamente" });


  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const updateLessonTheoryId = async (req = request, res = response) => {
    const { courseId, lessonId } = req.params;
    const { theoryId } = req.body;

    if (!courseId || !lessonId || !theoryId) {
    return res.status(400).json({
        msg: "Parámetros incompletos o inválidos"
    });
    }

    try {
    const result = await Lesson.updateOne(
        { idCourse: courseId, idLesson: lessonId },
        { $set: { theoryId } }
    );

    if (result.modifiedCount === 1) {
        return res.status(200).json({ msg: "theoryId actualizado correctamente" });
    } else {
        return res.status(404).json({ msg: "Lección no encontrada o sin cambios" });
    }
    } catch (error) {
    console.error(error);
    res.status(500).json({
        msg: "Error interno del servidor"
    });
    }
};

const updateLessonPracticeId = async (req = request, res = response) => {
    const { courseId, lessonId } = req.params;
    const { practiceId } = req.body;

    if (!courseId || !lessonId || !practiceId) {
    return res.status(400).json({
        msg: "Parámetros incompletos o inválidos"
    });
    }

    try {
    const result = await Lesson.updateOne(
        { idCourse: courseId, idLesson: lessonId },
        { $set: { practiceId } }
    );

    if (result.modifiedCount === 1) {
        return res.status(200).json({ msg: "practiceId actualizado correctamente" });
    } else {
        return res.status(404).json({ msg: "Lección no encontrada o sin cambios" });
    }
    } catch (error) {
    console.error(error);
    res.status(500).json({
        msg: "Error interno del servidor"
    });
    }
};

module.exports = {
    getLessons,
    getLesson,
    createLesson,
    updateLesson,
    deleteLesson,
    getLessonsByCourse,
    updateLessonTheoryId,
    updateLessonPracticeId
}
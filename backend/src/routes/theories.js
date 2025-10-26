const { Router } = require("express");
const {
    getTheoryByLesson,
    createTheory,
    deleteTheory
} = require("../controller/theories");

const router = Router();

//router.get("/", getTheories); // Obtener todo (opcional)
router.get("/lesson/:idLesson", getTheoryByLesson); // Obtener teoría por idLesson
router.post("/", createTheory); // Crear una teoría
router.delete("/:id", deleteTheory); // Eliminar una teoría por ID

module.exports = router;
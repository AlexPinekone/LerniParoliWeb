const {Router} = require('express');
const { getPractice, createPractice, updatePractice, deletePractice, getPractices } = require('../controller/practices');

const router = Router();

//router.get("/:id/P/:id", getPractice);

//router.get("/", getPractices);
//Manda la lección
router.get("/:id", getPractice);
router.post("/", createPractice);
//router.put("/:id", updatePractice);
router.delete("/:id", deletePractice);

module.exports = router;
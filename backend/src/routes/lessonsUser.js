const {Router} = require('express');
const { getLessonUserById, createLessonUser, updateLessonUser, deleteLessonUser, getLessonUsers } = require('../controller/lessonsUser');

const router = Router();

//Plural
router.get("/:idCourse/:username", getLessonUsers);
//Individual
router.get("/:idLesson/:username", getLessonUserById);
router.post("/:idLesson/:username", createLessonUser);

router.put("/:idLesson/:username", updateLessonUser);
router.delete('/:idLesson/:username', deleteLessonUser);

module.exports = router;
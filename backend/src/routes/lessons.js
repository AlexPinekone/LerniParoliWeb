const {Router} = require('express');
const { getLessons, createLesson, updateLesson, deleteLesson, getLesson, getLessonsByCourse, updateLessonTheoryId, updateLessonPracticeId} = require('../controller/lessons');

const router = Router();

router.get("/course/:courseId", getLessonsByCourse);
router.get("/:courseId/:lessonId", getLesson);
router.post("/", createLesson);

router.put("/:lessonId", updateLesson);
router.delete("/:lessonId", deleteLesson);

router.patch("/:courseId/:lessonId/theory", updateLessonTheoryId);
router.patch("/:courseId/:lessonId/practice", updateLessonPracticeId);

module.exports = router;
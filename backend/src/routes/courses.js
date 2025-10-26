const {Router} = require('express');
const { getCourse, createCourse, updateCourse, deleteCourse, getCourses } = require('../controller/courses');
const {verifyAdminRole} = require('../middlewares/verifyAdminRole');
const { verifyJWT } = require('../middlewares/verifyJWTs.js');

const router = Router();

router.get("/", getCourses);
router.get("/:id", getCourse);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;

/*,[verifyJWT, verifyAdminRole],*/
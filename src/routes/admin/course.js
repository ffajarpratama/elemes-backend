const router = require('express').Router();
const multer = require('../../middlewares/multer');

//load admin course controller
const courseController = require('../../controllers/admin/CourseController');

// route GET api/admin/course/
// desc: get all course
router.get('/', courseController.getAllCourse);
// route GET api/admin/course/:id
// desc: get course details
router.get('/:id', courseController.getCourseDetails);
// route POST api/admin/course
// desc: add new course
router.post('/', multer.single('picture'), courseController.store);
// route PUT api/admin/course/:id
// desc: update course
router.put('/:id', multer.single('picture'), courseController.update);
// route DELETE api/admin/course:id
// desc: delete course
router.delete('/:id', courseController.destroy);

module.exports = router;
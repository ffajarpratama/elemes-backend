const router = require('express').Router();

//load user course controller
const courseController = require('../../controllers/user/CourseController');

// route GET api/user/course/
// desc: get all courses
router.get('/', courseController.getAllCourse);
// route GET api/user/course/search?course=foo
// desc: search course
router.get('/search', courseController.searchCourse);
// router GET api/user/course/sort?price=lowest
// desc: sort course
router.get('/sort', courseController.sortCourse);
// route GET api/user/course/:id
// desc: get course details
router.get('/:id', courseController.getCourseDetails);

module.exports = router;
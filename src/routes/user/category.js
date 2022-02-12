const router = require('express').Router();

//load user category controller
const categoryController = require('../../controllers/user/CategoryController');

// route GET api/user/category/
// desc: get all categories
router.get('/', categoryController.getAllCategories);
// route GET api/user/category/popular
// desc: get category with highest rating
router.get('/popular', categoryController.getPopularCategory);

module.exports = router;
const router = require('express').Router();

//load admin category controller
const categoryController = require('../../controllers/admin/CategoryController');

// route GET api/admin/category/
// desc: get all categories
router.get('/', categoryController.getAllCategories);
// route GET api/admin/category/:id
// desc: get category details
router.get('/:id', categoryController.getCategory);
// route POST api/admin/category/
// desc: add new category
router.post('/', categoryController.store);
// route PUT api/admin/category/:id
// desc: update category
router.put('/:id', categoryController.update);
// route DELETE api/admin/category/:id
// desc: delete category
router.delete('/:id', categoryController.destroy);

module.exports = router;
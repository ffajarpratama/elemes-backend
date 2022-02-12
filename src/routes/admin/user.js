const router = require('express').Router();

//load admin user controller
const userController = require('../../controllers/admin/UserController');

// route GET api/admin/user/
// desc: get all users
router.get('/', userController.getAllUser);
// route GET api/admin/user/trashed
// desc: get soft deleted users
router.get('/trashed', userController.getDeletedUser);
// route GET api/admin/user/:id
// desc: get user details
router.get('/:id', userController.getUserDetails);
// route DELETE api/admin/user/:id
// desc: soft delete user
router.delete('/:id', userController.softDeleteUser);
// route POST api/admin/user/restore/:id
// desc: restore soft deleted user
router.post('/restore/:id', userController.restoreUser);
// route DELETE api/admin/user/destroy/:id
// desc: force delete user
router.delete('/destroy/:id', userController.forceDeleteUser);

module.exports = router;

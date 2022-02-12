const router = require('express').Router();
const multer = require('../middlewares/multer');

//load auth controller
const loginController = require('../controllers/auth/LoginController');
const registerController = require('../controllers/auth/RegisterController');

// route POST api/auth/login
// desc: login endpoint
router.post('/login', loginController.login);

// route POST api/auth/register
// desc: register endpoint
router.post('/register', multer.single('photo'), registerController.register);

module.exports = router;
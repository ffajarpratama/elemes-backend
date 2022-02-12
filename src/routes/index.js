const express = require('express');
const router = express.Router();

//import middleware
const { isAuthenticated, isAdmin } = require('../middlewares/authentication');

//insert middlewares into array
const authMiddlewares = [
  isAuthenticated,
  isAdmin,
];

//import routes
const auth = require('./auth');
const adminCourse = require('./admin/course');
const adminCategory = require('./admin/category');
const adminUser = require('./admin/user');
// const user = require('./users');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//route using
// AUTHENTICATION ENDPOINT
router.use('/api/auth', auth);
// END AUTHENTICATION ENDPOINT

// ADMIN COURSE ENDPOINT
router.use('/api/admin/course', authMiddlewares, adminCourse);
// END ADMIN COURSE ENDPOINT

// ADMIN CATEGORY ENDPOINT
router.use('/api/admin/category', authMiddlewares, adminCategory);
// END ADMIN CATEGORY ENDPOINT

// ADMIN USER ENDPOINT
router.use('/api/admin/user', authMiddlewares, adminUser);
// END ADMIN USER ENDPOINT

module.exports = router;

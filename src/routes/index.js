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
// AUTH ROUTES
const auth = require('./auth');
// END AUTH ROUTES

// ADMIN ROUTES
const adminCourse = require('./admin/course');
const adminCategory = require('./admin/category');
const adminUser = require('./admin/user');
const adminStatistic = require('./admin/statistic');
// END ADMIN ROUTES

// USER ROUTES
const userCourse = require('./user/course');
const userCategory = require('./user/category');
// END USER ROUTES

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//route using
// AUTHENTICATION ENDPOINT
router.use('/api/auth', auth);
// END AUTHENTICATION ENDPOINT

// ADMIN ENDPOINTS
// admin course endpoint
router.use('/api/admin/course', authMiddlewares, adminCourse);
// end admin course endpoint

// admin category endpoint
router.use('/api/admin/category', authMiddlewares, adminCategory);
// end admin category endpoint

// admin user endpoint
router.use('/api/admin/user', authMiddlewares, adminUser);
// end admin user endpoint

// admin statistic endpoint
router.use('/api/admin/statistic', authMiddlewares, adminStatistic);
// end admin statistic
// END ADMIN ENDPOINTS

// USER ENDPOINTS
// user category endpoint
router.use('/api/user/category', authMiddlewares[0], userCategory);
// end user category endpoint

// user course endpoint
router.use('/api/user/course', authMiddlewares[0], userCourse);
// end user course endpoint
// END USER ENDPOINTS

module.exports = router;

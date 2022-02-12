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

module.exports = router;

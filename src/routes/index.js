const express = require('express');
const router = express.Router();

//import routes
const auth = require('./auth');
// const user = require('./users');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//route using
// router.use('/user', user);
router.use('/api/auth', auth);

module.exports = router;

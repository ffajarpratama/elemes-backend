const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//import routes
const user = require('./users');

//route using
router.use('/user', user);

module.exports = router;

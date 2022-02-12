const router = require('express').Router();

// load admin statistic controller
const statisticController = require('../../controllers/admin/StatisticController');

// route GET api/admin/statistic
// desc: get statistic
router.get('/', statisticController.getStatistic);

module.exports = router;
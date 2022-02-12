const { User, Course } = require('../../db/models');

class StatisticController {
    static async getStatistic(req, res) {
        const userCount = await User.count();
        const courseCount = await Course.count();
        const freeCourseCount = await Course.findAndCountAll({
            where: { price: 0 }
        });
        const statistic = {
            'Total User Count': userCount,
            'Total Course Count': courseCount,
            'Total Free Course Count': freeCourseCount.count
        }
        return res.status(200).json(statistic);
    }
}

module.exports = StatisticController
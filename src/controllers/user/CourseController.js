const { Course } = require('../../db/models');
const { Op } = require('sequelize');

class CourseController {
    static async getAllCourse(req, res) {
        const courses = await Course.findAll();
        return res.status(200).json(courses);
    }

    static async getCourseDetails(req, res) {
        const course = await Course.findByPk(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: 'Course not found!'
            });
        }

        return res.status(200).json(course);
    }

    static async searchCourse(req, res) {
        const course = await Course.findAll({
            where: { name: { [Op.like]: `%${req.query.course}%` } }
        });
        return res.json(course);
    }

    static async sortCourse(req, res) {
        if (req.query.price !== 'free') {
            if (req.query.price === 'lowest') {
                req.query.price = 'ASC';
            } else if (req.query.price === 'highest') {
                req.query.price = 'DESC';
            } else {
                req.query.price = 'ASC';
            }

            await Course.findAll({
                where: { price: { [Op.ne]: 0 } },
                order: [
                    ['price', `${req.query.price}`]
                ]
            }).then((result) => {
                return res.status(200).json(result);
            });

        } else {
            await Course.findAll({
                where: { price: 0 }
            }).then((result) => {
                return res.status(200).json(result);
            });
        }
    }
}

module.exports = CourseController;
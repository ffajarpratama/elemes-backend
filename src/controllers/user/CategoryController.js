const { Sequelize } = require('sequelize');
const DB = require('../../config/database');
const sequelize = new Sequelize(DB.development);
const { Category, Course } = require('../../db/models');

class CategoryController {
    static async getAllCategories(req, res) {
        const categories = await Category.findAll({ include: 'Courses' });
        return res.status(200).json(categories);
    }

    static async getPopularCategory(req, res) {
        const popularCategory = await sequelize.query(`SELECT ca.*, AVG(co.rating) AS "avg_rating"
            FROM categories ca JOIN courses co ON ca.id = co.categoryId GROUP BY co.categoryId
            ORDER BY AVG(co.rating) DESC LIMIT 1`, { type: sequelize.QueryTypes.SELECT });

        await Course.findAll({
            where: {
                categoryId: popularCategory[0].id
            }
        }).then((result) => {
            popularCategory[0].Courses = result;
            return res.json(popularCategory);
        })
    }
}

module.exports = CategoryController;
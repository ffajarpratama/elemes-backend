const { Category } = require('../../db/models');

//load input validation
const validateCategoryInput = require('../../helpers/validations/category');

class CategoryController {
    static async getAllCategories(req, res) {
        const categories = await Category.findAll({ include: 'Courses' });
        return res.status(200).json(categories);
    }

    static async getCategory(req, res) {
        const category = await Category.findByPk(req.params.id, { include: 'Courses' });

        if (!category) {
            return res.status(404).json({
                message: 'Category not found!'
            });
        }

        return res.status(200).json(category);
    }

    static async store(req, res) {
        // form validation
        const { errors, isValid } = validateCategoryInput(req.body);

        // check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        await Category.create({
            name: req.body.name
        }).then((category) => {
            return res.status(201).json({
                message: 'Category created!',
                category
            });
        }).catch((error) => {
            return res.status(400).json(error);
        });
    }

    static async update(req, res) {
        // form validation
        const { errors, isValid } = validateCategoryInput(req.body);

        // check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: 'Category not found!'
            });
        }

        category.update({
            name: req.body.name,
        }, {
            where: { id: req.params.id },
        }).then((category) => {
            return res.status(200).json({
                message: 'Category updated!',
                category
            });
        }).catch((error) => {
            return res.status(400).json(error);
        });
    }

    static async destroy(req, res) {
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: 'Category not found!'
            });
        }

        category.destroy().then(() => {
            res.status(200).json({
                message: 'Category deleted!'
            });
        }).catch((error) => {
            return res.status(400).json(error);
        });
    }
}

module.exports = CategoryController;
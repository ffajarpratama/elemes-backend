const { User } = require('../../db/models');
const { Op } = require('sequelize');

class UserController {
    static async getAllUser(req, res) {
        const users = await User.findAll({
            where: {
                isAdmin: false
            }
        });
        return res.status(200).json(users);
    }

    static async getDeletedUser(req, res) {
        const deletedUsers = await User.findAll({
            where: { deletedAt: { [Op.ne]: null } },
            paranoid: false
        });

        return res.status(200).json(deletedUsers);
    }

    static async getUserDetails(req, res) {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(400).json({
                message: 'User not found!'
            });
        }

        return res.status(200).json(user);
    }

    static async softDeleteUser(req, res) {
        await User.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            return res.status(200).json({
                message: 'User soft deleted!'
            });
        }).catch((error) => {
            return res.status(400).json(error);
        });
    }

    static async restoreUser(req, res) {
        await User.restore({
            where: { id: req.params.id }
        }).then(() => {
            return res.status(200).json({
                message: 'User restored!',
            });
        }).catch((error) => {
            return res.status(400).json(error);
        });
    }

    static async forceDeleteUser(req, res) {
        await User.destroy({
            where: { id: req.params.id },
            force: true
        }).then(() => {
            return res.status(200).json({
                message: 'User deleted permanently!',
            });
        }).catch((error) => {
            return res.status(400).json(error);
        });
    }
}

module.exports = UserController;
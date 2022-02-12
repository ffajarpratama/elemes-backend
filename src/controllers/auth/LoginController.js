const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//load access key from .env
const accessKey = process.env.ACCESS_KEY_SECRET;

//load input validation
const validateLoginInput = require('../../helpers/validations/login');

class LoginController {
    static async login(req, res) {
        //form validation
        const { errors, isValid } = validateLoginInput(req.body);
        //check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        await User.findOne({ where: { email: req.body.email } }).then((user) => {
            //check if user does not exists
            if (!user) {
                return res.status(404).json({
                    message: 'User with this credentials does not exist in our record!'
                });
            }

            bcrypt.compare(req.body.password, user.password).then((isMatch) => {
                if (isMatch) {
                    const accessToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, accessKey, { expiresIn: '30m' });

                    return res.status(200).json({
                        user,
                        accessToken: accessToken,
                    });
                } else {
                    return res.status(400).json({
                        message: 'Password incorrect!'
                    });
                }
            });
        });
    }
}

module.exports = LoginController;
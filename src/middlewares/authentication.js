const jwt = require('jsonwebtoken');
const { User } = require('../db/models');
require('dotenv').config();

const accessKey = process.env.ACCESS_KEY_SECRET;

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'You need to login first!'
        });
    }

    jwt.verify(token, accessKey, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: 'Invalid token, please log in again!'
            });
        }
        req.user = user;
        next();
    });
}

const isAdmin = (req, res, next) => {
    User.findOne({ where: { id: req.user.id } }).then((user) => {
        if (user.isAdmin === true) {
            return next();
        } else {
            return res.status(403).json({
                message: 'You are forbidden to access this resource!'
            });
        }
    });
}

module.exports = {
    isAuthenticated,
    isAdmin
}
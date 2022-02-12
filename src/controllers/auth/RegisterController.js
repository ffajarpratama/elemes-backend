const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const cloudinary = require('../../config/cloudinary');
const path = require('path');

//load input validation
const validateRegisterInput = require('../../helpers/validations/register');

class RegisterController {
    static async register(req, res) {
        //form validation
        const { errors, isValid } = validateRegisterInput(req.body);

        //check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        if (!req.file) {
            return res.status(400).json({
                message: 'Photo field required!'
            });
        }

        if (req.file) {
            const maxSize = 1024 * 1024;
            const ext = path.extname(req.file.originalname);

            if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
                return res.status(400).json({ message: 'File type is not supported!' });
            }

            if (req.file.size >= maxSize) {
                return res.status(400).json({ message: 'Your photo cannot be bigger than 1 MB' })
            }
        }

        await User.findOne({ where: { email: req.body.email } }).then((isExists) => {
            if (isExists) {
                return res.status(400).json({
                    message: 'Another user with this email already exists!'
                });
            } else {
                cloudinary.uploader.upload(req.file.path, {
                    folder: 'elemes-backend/users/',
                    public_id: req.body.email,
                    overwrite: true
                }).then((result) => {
                    User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10),
                        cloudinaryPublicId: result.public_id,
                        cloudinarySecureURL: result.secure_url,
                        isAdmin: false
                    }).then(() => {
                        return res.status(200).json({
                            message: 'You have been registered successfully!'
                        });
                    }).catch((err) => {
                        return res.status(400).json(err);
                    });
                });
            }
        });
    }

}

module.exports = RegisterController;
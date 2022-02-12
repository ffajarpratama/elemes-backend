const { Course } = require('../../db/models');
const cloudinary = require('../../config/cloudinary');
const path = require('path');

//load input validation
const validateCourseInput = require('../../helpers/validations/course');

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

    static async store(req, res) {
        //form validation
        const { errors, isValid } = validateCourseInput(req.body);

        //check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        if (!req.file) {
            return res.status(400).json({
                message: 'Course picture field is required!'
            });
        }

        if (req.file) {
            const maxSize = 1024 * 1024;
            const ext = path.extname(req.file.originalname);

            if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
                return res.status(400).json({
                    message: 'File type is not supported!'
                });
            }

            if (req.file.size >= maxSize) {
                return res.status(400).json({
                    message: 'Picture cannot be bigger than 1 MB!'
                });
            }
        }

        try {
            let courseName = req.body.name;
            const reservedChars = /[?&#\%<>]/g;
            const charFound = courseName.match(reservedChars);
            courseName = courseName.replace(charFound, '');

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: `elemes-backend/courses/${courseName}/`
            });

            Course.create({
                CategoryId: parseInt(req.body.categoryId),
                name: req.body.name,
                description: req.body.description,
                cloudinaryPublicId: result.public_id,
                cloudinarySecureURL: result.secure_url,
                price: parseInt(req.body.price)
            }).then((course) => {
                return res.status(201).json({
                    message: 'Course added!',
                    course,
                });
            }).catch((error) => {
                return res.status(400).json(error);
            });
        } catch (error) {
            return res.status(400).json({
                message: 'There was something wrong while trying to upload the image...',
            });
        }
    }

    static async update(req, res) {
        //form validation
        const { errors, isValid } = validateCourseInput(req.body);

        //check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        if (!req.file) {
            return res.status(400).json({
                message: 'Course picture field is required!'
            });
        }

        if (req.file) {
            const maxSize = 1024 * 1024;
            const ext = path.extname(req.file.originalname);

            if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
                return res.status(400).json({
                    message: 'File type is not supported!'
                });
            }

            if (req.file.size >= maxSize) {
                return res.status(400).json({
                    message: 'Picture cannot be bigger than 1 MB!'
                });
            }
        }

        const course = await Course.findByPk(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: 'Course not found!'
            });
        }

        if (course.cloudinaryPublicId && course.cloudinarySecureURL) {
            const filename = course.cloudinaryPublicId.split('/').pop();
            const folderName = course.cloudinaryPublicId.replace(filename, '').slice(0, -1);

            await cloudinary.uploader.destroy(course.cloudinaryPublicId);
            cloudinary.api.delete_folder(folderName);
        }

        try {
            let courseName = req.body.name;
            const reservedChars = /[?&#\%<>]/g;
            const charFound = courseName.match(reservedChars);
            courseName = courseName.replace(charFound, '');

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: `elemes-backend/courses/${courseName}/`
            });

            course.update({
                CategoryId: parseInt(req.body.categoryId),
                name: req.body.name,
                description: req.body.description,
                cloudinaryPublicId: result.public_id,
                cloudinarySecureURL: result.secure_url,
                price: parseInt(req.body.price)
            }, {
                where: { id: req.params.id }
            }).then((course) => {
                return res.status(200).json({
                    message: 'Course updated!',
                    course,
                });
            }).catch((error) => {
                return res.status(400).json(error);
            });
        } catch (error) {
            return res.status(400).json({
                message: 'There was something wrong while trying to upload the image...',
                error
            });
        }
    }

    static async destroy(req, res) {
        const course = await Course.findByPk(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: 'Course not found!'
            });
        }

        if (course.cloudinaryPublicId && course.cloudinarySecureURL) {
            const filename = course.cloudinaryPublicId.split('/').pop();
            const folderName = course.cloudinaryPublicId.replace(filename, '').slice(0, -1);

            await cloudinary.uploader.destroy(course.cloudinaryPublicId);
            cloudinary.api.delete_folder(folderName);
        }

        course.destroy().then(() => {
            res.status(200).json({
                message: 'Course deleted!'
            });
        }).catch((error) => {
            res.status(400).json(error);
        });
    }
}

module.exports = CourseController;
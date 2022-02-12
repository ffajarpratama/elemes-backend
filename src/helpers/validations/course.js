const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = validateCourseInput = (data) => {
    let errors = {};

    // convert empty fields to empty string so we can use validator functions
    data.categoryId = !isEmpty(data.categoryId) ? data.categoryId : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.description = !isEmpty(data.description) ? data.description : '';

    //categoryId field check
    if (validator.isEmpty(data.categoryId)) {
        errors.category = 'Category is required!';
    }

    // name field check
    if (validator.isEmpty(data.name)) {
        errors.name = 'Course name field is required!';
    }

    //description field check
    if (validator.isEmpty(data.description)) {
        errors.description = 'Course description field is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = validateCategoryInput = (data) => {
    let errors = {};

    // convert empty fields to empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : '';

    // name field check
    if (validator.isEmpty(data.name)) {
        errors.name = 'Category name field is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
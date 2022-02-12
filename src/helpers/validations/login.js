const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = validateLoginInput = (data) => {
    let errors = {};

    // Convert empty fields to empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // Email check or username
    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required!';
    } else if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid!';
    }

    // Password check
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
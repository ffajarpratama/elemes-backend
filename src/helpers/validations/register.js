const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = validateRegisterInput = (data) => {
    let errors = {};

    // Convert empty fields to empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    //Name field check
    if (validator.isEmpty(data.name)) {
        errors.name = 'Name field is required!';
    }

    //Email check
    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required!';
    } else if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid!';
    }

    //Password check
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required!';
    } else if (validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password field is required!';
    } else if (!validator.isLength(data.password, { min: 6, max: 10 })) {
        errors.password = "Password must be at least 6 characters!";
    } else if (!validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
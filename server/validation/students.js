const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateStudents(data) {
    let errors = {};
    data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
    if (Validator.isEmpty(data.first_name)) {
        errors.first_name = "First_name field is required";
    }
    if (Validator.isEmpty(data.last_name)) {
        errors.last_name = "Last_name field is required";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
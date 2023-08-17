const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateStudents(data) {
    let errors = {};
    data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
    data.gender = !isEmpty(data.gender) ? data.gender : "";
    if (Validator.isEmpty(data.firstname)) {
        errors.firstname = "Firstname field is required";
    }
    if (Validator.isEmpty(data.lastname)) {
        errors.lastname = "Lastname field is required";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (Validator.isEmpty(data.gender)) {
        errors.gender = "Gender field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
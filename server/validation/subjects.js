const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateSubjects(data) {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : "";
    data.content = !isEmpty(data.content) ? data.content : "";
    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required";
    }
    if (Validator.isEmpty(data.content)) {
        errors.content = "Contents field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
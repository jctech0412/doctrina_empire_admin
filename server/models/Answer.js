const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AnswerSchema = new Schema({
    subject_id: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    valid: {
        type: String,
        required: false
    }
});

AnswerSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

AnswerSchema.set('toJSON', {
    virtuals: true
});

module.exports = User = mongoose.model("answers", AnswerSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SubjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    varient: [
        {
            candidate: {
                type: String,
                required: true
            },
            truth: {
                type: Boolean,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

SubjectSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

SubjectSchema.set('toJSON', {
    virtuals: true
});

module.exports = User = mongoose.model("subjects", SubjectSchema);

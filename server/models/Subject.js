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
    // creator:{
    //     type: Schema.Types.ObjectId,
    //     ref: users
    // },
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

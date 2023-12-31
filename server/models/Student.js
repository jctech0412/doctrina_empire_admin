const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

StudentSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

StudentSchema.set('toJSON', {
    virtuals: true
});

module.exports = User = mongoose.model("students", StudentSchema);

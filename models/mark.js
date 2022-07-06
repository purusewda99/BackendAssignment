const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SingleMarkSchema = new Schema({
    type: { type: String, },
    marks: { type: Number, },
});

const marksSchema = new Schema({
    total_marks: {
        type: Number
    },
    student_id:   { type: mongoose.Types.ObjectId, ref: 'Student' },
    class_id:   { type: mongoose.Types.ObjectId, ref: 'Class' },
    marks: [SingleMarkSchema],
});

module.exports = mongoose.model('Mark', marksSchema);
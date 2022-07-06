const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SingleStudentSchema = new Schema({
    student_id: { type: mongoose.Types.ObjectId, ref: 'Student' }
});

const classSchema = new Schema({
    class_name: {
        type: Number
    },
    students: [SingleStudentSchema]
});

module.exports = mongoose.model('Class', classSchema);
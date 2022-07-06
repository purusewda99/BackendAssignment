const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SingleClassSchema = new Schema({
    class_id: { type: mongoose.Types.ObjectId, ref: 'Class' }
});

const studentSchema = new Schema({
    student_name: {
        type: String
    },
    classes:   [SingleClassSchema],
})

module.exports = mongoose.model('Student', studentSchema);
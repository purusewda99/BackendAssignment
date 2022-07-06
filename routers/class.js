const express = require('express');
const Class = require('../models/class');
const Student = require('../models/student');
const router = new express.Router();

router.get('/classes', async (req, res) => {
    try {
        const val = await Class.find();
        const c = val.map((data) => {
            return {
                'class_id': data._id,
            }
        });
        res.send(c);
    } catch(e) {
        res.status(500).send();
    }
});


router.get('/class/:id/students', async (req, res) => {
    try {
        const classId = req.params.id;
        const classes = await Class.findOne({ "_id": classId });
        const studentData = classes.students;
        var studentArray = [];
        for(let i=0;i<studentData.length;i++) {
            const item = studentData[i];
            const student = await Student.findOne({'_id': item.student_id});
            const obj = {
                'student_id': item.student_id,
                'student_name': student.student_name,
            };
            studentArray.push(obj);

        }
        const c = {
            'class_id': classes._id,
            'students': studentArray,
        }
        res.send(c);
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
});

module.exports = router
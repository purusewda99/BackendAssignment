const express = require('express');
const Student = require('../models/student');
const Mark = require('../models/mark');
const router = new express.Router();

router.get('/students', async (req, res) => {
    try{
        const students = await Student.find();
        const s = students.map((data) => {
            delete data.classes;
            return {
                'student_id': data._id,
                'student_name': data.student_name
            }
        });
        res.send(s);
    } catch(e) {
        res.status(500).send();
    }
});

router.get('/students/:id/classes', async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findOne({_id: studentId});
        const s = {
            'student_id': student._id,
            'student_name': student.student_name,
            'classes': student.classes,
        };
        res.send(s);
    } catch(e) {
        res.status(500).send();
    }
});


router.get('/student/:id/performance', async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findOne({_id: studentId});
        const classesArray = student.classes;
        let classesData = [];
        for(let i=0;i<classesArray.length;i++) {
            const item = classesArray[i];
            const mark = await Mark.findOne({'class_id': item.class_id, 'student_id': studentId});
            console.log(mark);
            const obj = {
                'class_id': item.class_id,
                'total_marks': mark?.total_marks,
            };
            classesData.push(obj);
        }
        const s = {
            'student_id': student._id,
            'student_name': student.student_name,
            'classes': classesData,
        };
        res.send(s);
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
});

// router.get('/student/:id/performance', async (req, res) => {
//     try {

//     } catch(e) {
//         res.status(500).send();
//     }
// });

module.exports = router
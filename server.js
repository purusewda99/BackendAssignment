const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const studentRouter = require('./routers/student');
const classRouter = require('./routers/class');

const app = express();

app.use(bodyParser.json());
app.use(studentRouter);
app.use(classRouter);

mongoose.connect(`mongodb+srv://new-user3:4Gxtz9l1dVZa5RKN@cluster0.u86i2.mongodb.net/test`)
    .then(() => {
        app.listen(3000);
        console.log('welcome');
    })
    .catch(err => console.log(err));


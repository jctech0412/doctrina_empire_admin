const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const userRoute = require('./routes/api/users');
const studentRoute = require('./routes/api/students');
const subjectRoute = require('./routes/api/subjects');
const testRoute = require('./routes/test')
const cors = require("cors");

require('./config/passport')(passport);

const app = express();

app.use(cors());
app.use((express.json({ limit: "30mb", extended: true })));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // res.header('Access-Control-Expose-Headers', 'Authorization');
//     next();
// });

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

// app.listen(9000);

const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
    .then(() =>
        console.log('MongoDB successfully connected.')
    ).catch(err => console.log(err));

app.use(passport.initialize());

app.use('/api', userRoute);
app.use('/api/students', studentRoute)
app.use('/api/subjects', subjectRoute)
app.use('/test', testRoute);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

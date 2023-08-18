const validateStudents = require('./../validation/students');
const Student = require('./../models/Student');
const bcrypt = require('bcryptjs')
const addStudent = (req, res) =>{
    const { errors, isValid } = validateStudents(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Student.findOne({ email: req.body.email }).then(student => {
        if (student) {
            return res.status(400).json({ email: 'Email already exists' });
        } else {
            const newStudent = new Student({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email
            });
            newStudent
                .save()
                .then(student => {
                    console.log(student);
                    return res.status(200).json({message: 'Student added successfully. Refreshing data...'})
                })
                .catch(err => err.status(400).json(err));      
        }
    });
}

const getStudent = (req, res) => {
    Student
        .find()
        .then(student => {
            return res.json(student);
        })
        .catch(err => {
            console.log(err)
        })
}

const updateStudent = (req, res) => {
    const { errors, isValid } = validateStudents(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const _id = req.body._id;
    Student.findOne({ _id }).then(student => {
        if (student) {
            console.log(student)
            Student.findOneAndUpdate(
                { _id: _id},
                { $set: req.body },
                { new: true }
            ).then(profile => { res.status(200).json({ message: 'Student updated successfully. Refreshing data...', success: true }); })
        } else {
            return res.status(400).json({ message: 'Now Student found to update.' });
        }
    });
}

const updateStatus = (req, res)=> {
    console.log(req.body)
    Student.findOne({_id: req.body._id})
        .then(student => {
            student.active = !student.active
            student
                .save()
                .then(update => { res.status(200).json({ message: "Status changed"})})
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

const deleteStudent = (req, res) => {
    Student.deleteOne({ _id: req.body._id}).then(student => {
        if (student) {
            return res.status(200).json({message: 'Student deleted successfully. Refreshing data...', success: true})
        }
    });
}

const login = (req,res) => {

    const email = req.headers['email'];
    const password = req.headers['password'];
    Student.findOne({ email }).then(student => {
        if (!student) {
            return res.status(404).json(
                {
                    success: 0,
                    msg: 'Email not found'
                })
        }
        if(!student.active){
            return res.status(404).json({
                success: 0,
                msg: 'Your account is not active'
            })
        }
        bcrypt.compare(password, student.password).then(isMatch => {
            if (isMatch) {
                return res.status(200).json(
                    {
                        success: 1,
                        msg: 'Login successfully',
                        student
                    })
            } else {
                return res.status(404).json(
                        {
                            success: 0,
                            msg: 'Password incorrect'
                        })
            }
        });
    });    
}

const register = (req, res) => {
    Student.findOne({ email: req.headers['email'] }).then(student => {
        if (student) {
            return res.status(404).json(
                {
                    success: 0,
                    msg: 'Email already exist'
                })
        } else {
            const newStudent = new Student({
                first_name: req.headers['first_name'],
                last_name: req.headers['last_name'],
                email: req.headers['email'],
                password: req.headers['password']
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newStudent.password, salt, (err, hash) => {
                    if (err) throw err;
                    newStudent.password = hash;
                    newStudent
                        .save()
                        .then(student => {
                            return res.status(200).json(
                                {
                                    success: 1,
                                    msg: 'success'
                                })
                        }).catch(err => console.log(err));
                });
            });
        }
    });
}
module.exports = {
    addStudent,
    getStudent,
    updateStudent,
    deleteStudent,
    login,
    register,
    updateStatus
};
const validateStudents = require('./../validation/students');
const Student = require('./../models/Student');

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
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender
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
    console.log(req.body)
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

const deleteStudent = (req, res) => {
    Student.deleteOne({ _id: req.body._id}).then(student => {
        if (student) {
            return res.status(200).json({message: 'Student deleted successfully. Refreshing data...', success: true})
        }
    });
}

module.exports = {
    addStudent,
    getStudent,
    updateStudent,
    deleteStudent
};
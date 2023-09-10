const validateSubject = require('../validation/subjects');
const Subject = require('../models/Subject');
const Answer = require('../models/Answer');
const mongoose = require("mongoose");

const addAnswer = (req, res) =>{
    // console.log(req.body[0], req.body[1].answer);
    const { errors, isValid } = validateSubject(req.body);
    
    const newAnswer = new Answer({
        subject_id: req.body[0],
        answer: req.body[1].answer,
        valid: req.body[1].valid,
    });
    newAnswer
        .save()
        .then(subject => {
            return res.status(200).json({
                message: 'Subject added successfully. Refreshing data...'
            })
        })
        .catch(err => console.log(err));    

}

const getAnswer = (req, res) => {
    Answer
        .find({ subject_id: req.body.id })
        .then(subject => {
            return res.json(subject);
        })
        .catch(err => {
            console.log(err)
        })
}

const getApi = (req, res) => {
    const id = req.headers['id'];
    console.log(id);
    Answer
        .find({ subject_id: id })
        .then(subject => {
            return res.json(subject);
        })
        .catch(err => {
            console.log(err)
        })
}

const updateAnswer = (req, res) => {
    const _id = req.body[0];
    console.log(req.body);
    Answer.findOne({ _id }).then(answer => {
        if (answer) {
            console.log(answer);
            answer
                .updateOne(
                    { answer: req.body[1].answer, valid: req.body[1].valid }
                )
                .then(profile => { res.status(200).json({
                    message: 'Answer updated successfully. Refreshing data...', success: true 
                }); 
            })
        } else {
            return res.status(400).json({ message: 'Now Answer found to update.' });
        }
    });
}

const deleteAnswer = (req, res) => {
    Answer.deleteOne({ _id: req.body._id}).then(answer => {
        if (answer) {
            return res.status(200).json({
                message: 'Answer deleted successfully. Refreshing data...', success: true
            })
        }
    });
}

module.exports = {
    addAnswer,
    getAnswer,
    deleteAnswer,
    updateAnswer,
    getApi
};
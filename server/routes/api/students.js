const express = require('express');
const router = express.Router();
const studentController = require('./../../controllers/studentControllers');
router.post('/add', (req, res) => {studentController.addStudent(req, res)});

router.post('/get', (req, res) => {studentController.getStudent(req, res)})

router.post('/update', (req, res) => {studentController.updateStudent(req, res)})

router.post('/delete', (req, res) => {studentController.deleteStudent(req, res)});
module.exports = router;
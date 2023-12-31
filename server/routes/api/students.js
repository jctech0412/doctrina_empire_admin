const express = require('express');
const router = express.Router();
const studentController = require('./../../controllers/studentControllers');
router.post('/add', (req, res) => {studentController.addStudent(req, res)});

router.post('/get', (req, res) => {studentController.getStudent(req, res)})

router.post('/update', (req, res) => {studentController.updateStudent(req, res)})

router.post('/delete', (req, res) => {studentController.deleteStudent(req, res)});

router.post('/updateStatus', (req, res) => {studentController.updateStatus(req, res)});

router.get('/login', (req, res) => {studentController.login(req, res)});
router.get('/register', (req, res) => {studentController.register(req, res)});

module.exports = router;

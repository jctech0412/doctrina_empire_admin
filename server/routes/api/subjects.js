const express = require('express');
const router = express.Router();
const subjectControllers = require('./../../controllers/subjectControllers');
router.post('/add', (req, res) => {subjectControllers.addSubject(req, res)});

router.post('/get', (req, res) => {subjectControllers.getSubject(req, res)})

router.post('/update', (req, res) => {subjectControllers.updateSubject(req, res)})

router.post('/delete', (req, res) => {subjectControllers.deleteSubject(req, res)});
router.post('/input_varient', (req, res) => {subjectControllers.input_varient(req, res)});

router.get('/get', (req, res) => {subjectControllers.getSubject(req, res)});

module.exports = router;

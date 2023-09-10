const express = require('express');
const router = express.Router();
const subjectControllers = require('./../../controllers/subjectControllers');
router.post('/add', (req, res) => {subjectControllers.addSubject(req, res)});

router.post('/get', (req, res) => {subjectControllers.getSubject(req, res)})

router.post('/answer/add', (req, res) => {subjectControllers.addAnswer(req, res)})

router.post('/answer/get', (req, res) => {subjectControllers.getAnswer(req, res)})

router.post('/answer/update', (req, res) => {subjectControllers.updateAnswer(req, res)})

router.post('/update', (req, res) => {subjectControllers.updateSubject(req, res)})

router.post('/delete', (req, res) => {subjectControllers.deleteSubject(req, res)});

router.post('/answer/delete', (req, res) => {subjectControllers.deleteAnswer(req, res)});

router.post('/input_varient', (req, res) => {subjectControllers.input_varient(req, res)});

router.get('/get', (req, res) => {subjectControllers.getSubject(req, res)});

module.exports = router;

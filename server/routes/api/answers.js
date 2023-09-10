const express = require('express');
const router = express.Router();
const answerControllers = require('../../controllers/answerControllers');

router.post('/add', (req, res) => {answerControllers.addAnswer(req, res)})

router.post('/get', (req, res) => {answerControllers.getAnswer(req, res)})

router.get('/get', (req, res) => {answerControllers.getApi(req, res)})

router.post('/update', (req, res) => {answerControllers.updateAnswer(req, res)})

router.post('/delete', (req, res) => {answerControllers.deleteAnswer(req, res)})

module.exports = router;

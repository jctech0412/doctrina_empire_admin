const express = require('express');
const router = express.Router();
const testController = require('./../controllers/testController')

router.get('/test', (req, res) => {testController.test(req, res)});

module.exports = router;

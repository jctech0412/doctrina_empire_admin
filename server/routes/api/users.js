const express = require('express');
const router = express.Router();
const userController = require('./../../controllers/userControllers')

router.post('/user-add', (req, res) => {userController.addUser(req, res)});

router.post('/user-data', (req, res) => {userController.getUser(req, res)});

router.post('/user-delete', (req, res) => {userController.deleteUser(req, res)});

router.post('/user-update', (req, res) => {userController.updateUser(req, res)});

router.post('/login', (req, res) => {userController.login(req, res)});
router.post('/register', (req, res) => {userController.register(req, res)});

module.exports = router;

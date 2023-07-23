const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/get-users', userController.getUserDetails); //receive request, different urls

router.post('/add-user', userController.postUserDetails);

router.delete('/delete-user/:id', userController.deleteUserDetails); // any name :id -> re parma folder, object key-value

module.exports = router;
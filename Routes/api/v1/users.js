const express = require('express');
const router = express.Router();
const usersController = require('../../../Controller/api/v1/users_api');
router.post('/createToken',usersController.createToken);


module.exports = router;
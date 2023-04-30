const express = require('express');

const router = express.Router();

const passport = require('passport');

// using controller
const controller = require('../Controller/userController');

router.get('/',controller.signOut);


module.exports = router;
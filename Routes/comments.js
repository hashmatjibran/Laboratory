const express = require('express');
const router = express.Router();

const passport = require('passport');

 const controller = require('../Controller/commentsController');

router.post('/create',
passport.checkAuthentication //only logged in users can create Comments
,controller.createComment);

module.exports = router;
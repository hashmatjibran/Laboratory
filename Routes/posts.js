const express = require('express');
const router = express.Router();

const controller = require('../Controller/postsController');
const passport = require('passport');

router.post('/createPost',
passport.checkAuthentication //only logged in users can create posts
,controller.createPost);

router.get('/delete_post', passport.checkAuthentication,controller.deletePost)



router.get('/myposts',
passport.isAuthenticatedUser //only logged in users can see his posts
,controller.myPosts);
module.exports = router;
const express = require('express');
const router = express.Router();

const controller = require('../Controller/postsController');

router.post('/createPost',controller.createPost);

router.get('/',controller.showPosts);

module.exports = router;
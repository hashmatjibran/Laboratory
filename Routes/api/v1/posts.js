const express = require('express');
const router = express.Router();

const postApi = require('../../../Controller/api/v1/posts_api');

router.get('/',postApi.index);
router.delete('/:id',postApi.delete);

module.exports = router;
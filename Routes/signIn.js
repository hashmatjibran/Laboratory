const express = require('express');

// creating a Router
const router = express.Router();

// use a controller
const controller = require('../Controller/userController');

router.get('/',(request , response)=>{
    return response.render('signIn');
});
router.post('/',controller.signIn);




// export the router
module.exports = router;
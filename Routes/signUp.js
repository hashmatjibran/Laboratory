const express = require('express');

const router =  express.Router();

const controller= require('../Controller/userController');

router.get('/',(request , response)=>{
    return response.render('signUp')
})
router.post('/',controller.signUp);


module.exports = router;
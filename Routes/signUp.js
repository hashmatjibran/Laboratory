const express = require('express');

const passport = require ("passport");
const router =  express.Router();

const controller= require('../Controller/userController');

router.get('/' ,(request ,response)=>{

    // if the user is authenticated don't let the user to redirect to sign Up page
    if(request.isAuthenticated())
    {
        return response.redirect('/home');
    }

    return response.render('signUp')
})
router.post('/',controller.signUp);


module.exports = router;
const express = require('express');
// using passport
const passport = require('passport');
// creating a Router
const router = express.Router();

// use a controller
const controller = require('../Controller/userController');

router.get('/',(request , response)=>{
    // if the user is authenticated don't let the user to redirect to sign In page 
    if(request.isAuthenticated())
    {
        return response.redirect('/profile');
    }
    return response.render('signIn');
});



router.post('/',passport.authenticate(
    'local',
    {failureRedirect:'/signIn'}
),
controller.signIn);




// export the router
module.exports = router;
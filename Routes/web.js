const express = require('express');
const passport = require('passport');
 const router = express.Router();

 router.get('/',(request , response) => {
   return response.render('signIn');
 });

 router.get('/profile',passport.checkAuthentication,(request , response)=>{
    return response.render('profile');
 });

 router.use('/signUp',require('./signUp'));

 router.use('/signIn',require('./signIn'))

router.use('/signOut',require('./signOut'));

router.use('/post',require('./posts'));
 module.exports = router;
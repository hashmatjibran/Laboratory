const express = require('express');
const passport = require('passport');
 const router = express.Router();

 router.get('/',passport.checkAuthentication,(request , response) => {
  return response.render('profile');
 });

 router.get('/profile',passport.checkAuthentication,(request , response)=>{
    return response.render('profile');
 });

 router.use('/signUp',require('./signUp'));

 router.use('/signIn',require('./signIn'))

router.use('/signOut',require('./signOut'));

router.use('/post',require('./posts'));

router.use('/comment',require('./comments'));

 module.exports = router;
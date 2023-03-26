const express = require('express');
const passport = require('passport');
 const router = express.Router();

 router.get('/',(request , response) => {
   return response.render('signIn');
 });

 router.get('/profile',passport.checkAuthentication,(request , response)=>{
    return response.render('profile',{'name':'jibby','email':'aa.vom'});
 });

 router.use('/signUp',require('./signUp'));

 router.use('/signIn',require('./signIn'))


 module.exports = router;
const express = require('express');
 const router = express.Router();


//  using controller
const controller = require('../Controller/userController');


 router.get('/',(request , response) => {
   return response.render('signIn');
 });


 router.use('/signUp',require('./signUp'));

 router.use('/signIn',require('./signIn'))

 router.get('/profile',controller.profile);


 router.get('/signOut',(request , response)=>{
    response.cookie('User_Id','');
    return response.redirect('/');
 });
 module.exports = router;
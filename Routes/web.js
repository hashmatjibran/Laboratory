const express = require('express');
const passport = require('passport');
 const router = express.Router();

//  requiring user model
 const user = require('../Models/userSchema');

 router.get('/',passport.checkAuthentication,(request , response) => {
  return response.redirect('/home');
 });

//  route for displaying the profile of users
 router.get('/profile/:id',passport.checkAuthentication,(request , response)=>{

      user.findById(request.params.id)
      .then((result) => {
         
            return response.render('profile',{users:result});

      }).catch((err) => {
         return response.redirect("back");
      });

 });

// route for displaying home page 
 router.get('/home',passport.checkAuthentication,(request , response)=>{
   user.find()
   .then((result) => {
      
      return response.render('home',{users:result});

   }).catch((err) => {
      return response.redirect("back");
   });
});

// route for update form for a user profile
router.post('/editProfile/:id',passport.checkAuthentication,(request , response)=>{

   if(request.body.password == request.body.confirmPassword)
   {
      user.findByIdAndUpdate(request.params.id,{
         $set:{
            email:request.body.email,
            name:request.body.name,
            password:request.body.password,
            age:request.body.age
         }
      })
      .then((result) => {
         return response.redirect('/home');
      })
   }
   else{
      return response.redirect("back");
   }
});

 router.use('/signUp',require('./signUp'));

 router.use('/signIn',require('./signIn'))

router.use('/signOut',require('./signOut'));

router.use('/post',require('./posts'));

router.use('/comment',require('./comments'));




 module.exports = router;
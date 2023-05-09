const express = require('express');
const passport = require('passport');
const User = require('../Models/userSchema');
 const router = express.Router();

//  requiring user model


 router.get('/',passport.checkAuthentication,(request , response) => {
  return response.redirect('/home');
 });

//  route for displaying the profile of users
 router.use('/profile',require('./profile'));

// route for displaying home page 
 router.use('/home',require('./home'));

// route for update form for a user profile
router.post('/editProfile/:id',passport.checkAuthentication,async (request , response)=>{

   console.log(request.params.id);
   if(request.body.password == request.body.confirmPassword)
   {
     await User.findByIdAndUpdate(request.params.id,{
         $set:{
            email: request.body.email,
            name: request.body.name,
            password: request.body.password,
            age: request.body.age
         }
      })
         return response.redirect('/home');
     
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
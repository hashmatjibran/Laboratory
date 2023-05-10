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

      if(request.params.id == request.user.id){
         try {
            // previous code to update/edit the user profile
         //    await User.findByIdAndUpdate(request.params.id,{
         //    $set:{
         //       email: request.body.email,
         //       name: request.body.name,
         //       password: request.body.password,
         //       age: request.body.age
         //    }
         // });
   
         let user = await User.findById(request.params.id);
   
         // using multer here
      User.uploadedAvatar(request ,response ,function (err) {
         if (err) {
            console.log(`error in multer **************`,err);
         }
         user.name = request.body.name;
         user.email = request.body.email;
         user.password = request.body.password;
         user.age = request.body.age;
         if(request.file){
            user.avatar = User.avatarPath+'/'+request.file.filename;
            
         }user.save();
        })


      return response.redirect('back');

      } catch (error) {
         console.log(error);
         return response.redirect("back");
      }
     
         
     
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
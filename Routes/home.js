const express = require('express');
const router = express.Router();

const post = require('../Models/postsSchema');
const user = require('../Models/userSchema');

const passport = require('passport');

router.get('/',passport.checkAuthentication,async (request , response)=>{

  try {

    let users = await user.find();
    
    let result = await post.find()
    .sort('-createdAt')
    .populate('user')
     .populate({
         path:'comments',
         populate:{
             path:'user'
         }
   
     });

       return response.render('home',{
           "users":users,
           "result":result
       });

  } catch (error) {
    console.log(`ERROR is ${error}`)
       return response.redirect("back");
  }
 });



module.exports = router;
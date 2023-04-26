const express = require('express');
const router = express.Router();

const passport = require('passport');

const user = require('../Models/userSchema');
router.get('/:id',passport.checkAuthentication,(request , response)=>{

    user.findById(request.params.id)
    .then((result) => {
       
          return response.render('profile',{users:result});

    }).catch((err) => {
       return response.redirect("back");
    });

});

module.exports = router;
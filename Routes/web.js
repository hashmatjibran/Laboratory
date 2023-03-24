const express = require('express');
 const router = express.Router();

 router.get('/',(request , response) => {
  console.log(request.cookies);
  response.cookie('User_Id','jibran');
   return response.render('signIn');
 });


 router.use('/signUp',require('./signUp'));

 router.use('/signIn',require('./signIn'))


 module.exports = router;
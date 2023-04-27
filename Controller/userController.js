const User = require('../Models/userSchema');

module.exports.signUp = async function (request , response) {
    try {

        // password check whether confirm password and password are equall
        if(request.body.password != request.body.confirmPassword)
        {
            return response.end(`Password and Confirm Password Didn't Match!`);
        }
        
        // try to create a user with given details from the user
      await  User.create(request.body)
      .then((result) => {
        // if success, send this data back
        return response.redirect('/signIn');
        
      }).catch((err) => {
        if(err.code == '11000')
        {
            // if Email is Found in Db i.e Account with the emial is already associated so send the message below back to the user
            return response.end(`Account with Email id: ${err.keyValue.email} Already exists! Try Using Another Email`);
        }
     });
      
        

    } catch (error) {
        
        return response.end(`Sign Up Failed Try Again Later! ERROR: ${error}`);

    }
    






}

module.exports.signIn = async function (request , response) {
    try {

        request.flash('success',"Logged in Successfully")
                return response.redirect('/home');

    } catch (error) {
        request.flash('error',"Log in failed!")
        return response.redirect('back');
    }
    
}

module.exports.signOut = function (request , response) {
   

    request.logout((err)=>{
        if(err)
        {
            return console.log(err);
        }
    });
    request.flash('success','Logged out successfully');
   return  response.redirect('/signIn');
  }

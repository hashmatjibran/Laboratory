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
        response.cookie('User_Id','');
       await User.findOne({email:request.body.email})
       .then((result) => {
            if(result == null || result == undefined)
            {
                return response.end(`No Account with email ${request.body.email} is Found!`);
            }
            if(result.password == request.body.password)
            {
                response.cookie('User_Id',result.id);
                return response.redirect('/profile');
            }
            else{
                return response.end(`Incorrect Email/Password`);
            }


       }).catch((err) => {
             console.log(`error in then catch ${err}`);
       });




    } catch (error) {
        return response.end(`Error error:${error}`)
    }
    
}

module.exports.profile = async function (request , response) {
    console.log(request.cookies.User_Id)
   try{
     if(request.cookies.User_Id != '' && request.cookies.User_Id != undefined)
    {
        
            await User.findById({_id:request.cookies.User_Id})
        .then((result) => {
            
            return response.render('profile',{
                'name':result.name,
                'email':result.email
            });
        }).catch((err) => {
            console.log(`inside error err:${err}`);
            return response.redirect('/signIn');
        });

        

        
    }
    else{
        return response.redirect('/signIn');
    }
}
        catch(err){
            console.log(`Inside err try catch ${err}`);
        }
  }
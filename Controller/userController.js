const User = require('../Models/userSchema');

module.exports.signUp = async function (request , response) {
    try {
        
      await  User.create({
        email:request.body.email,
        password : request.body.password,
        name:request.body.name,
        age : request.body.age
    });

        return response.end("created Successfully");

    } catch (error) {
        if(error.code == '11000')
        {
            return response.end(`Account with Email id: ${error.keyValue.email} Already exists! Try Using Another Email`)
        }
        return response.end(`Sign Up Failed Try Again Later! ERROR: ${error}`);

    }
    






}

module.exports.signIn = async function (request , response) {
    try {

       await User.findOne({email:request.body.email})
       .then((result) => {
            if(result == null || result == undefined)
            {
                return response.redirect(404,"back");
            }
            if(result.password == request.body.password)
            {
                return response.end(`Logged in successfully`);
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
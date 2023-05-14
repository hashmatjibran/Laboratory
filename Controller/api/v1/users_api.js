const jsonwebtoken = require('jsonwebtoken');


const User = require('../../../Models/userSchema');

module.exports.createToken = async function (request , response) {

try {

    let user = await User.findOne({email:request.body.email});
    console.log(user)
    if(!user || (user.password !=request.body.password))
    {
        return response.status(403).json({
            message:'Invalid email/password !'
        });
    }
    else{
        return response.status(200).json({
            message: 'sign in successfull',
            data: {
                token: jsonwebtoken.sign({id:user.id},'jibby', {issuer:'www.jibzlaboratory.com'},{expiresIn:10000})
            }
        });
    }

} catch (error) {
    console.log(error);
    return response.status(500).json({
        message: 'Internal server Error',
        err: `${error}`
    })
}
    

}

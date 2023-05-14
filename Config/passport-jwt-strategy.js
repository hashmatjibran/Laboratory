const passport = require('passport');

const passportJWT = require('passport-jwt').Strategy;

const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../Models/userSchema');
const opts={
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'jibby',
    issuer : 'www.jibzlaboratory.com'
}

passport.use(new passportJWT(opts,async function (payload ,done) { 
    try {
        let user = await User.findById(payload.id);
        
        if(user)
        {
            return done(null, user);
        }
        else{
            return done(null, false);
        }

    } catch (error) {
            return done(error, false);
    }

 }));

 module.exports = passport;

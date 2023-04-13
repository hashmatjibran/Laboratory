// require passport
const passport = require('passport');

// require passport-Strategy
const LocalStrategy = require('passport-local');

// use model here
const User = require('../Models/userSchema');

// using the passport Local Strategy
passport.use('local',new LocalStrategy(
    
    {
        usernameField:'email'
    },

   async function (email,password,done) { 

        // find a user and try to establish the identity
       await User.findOne({email:email})
        .then((result) => {

            // trying to match password
            if(result == null || result==undefined  || result.password != password  )
            {
                console.log(`Incorrect Email/Password Entered!`);
                return done(null,false);
            }
            else{
                return done(null,result);
            }
            
            
        }).catch((err) => {
            console.log(`Error in finding the user with email :${email} Error: ${err}`);
            return done(err);
        });

 }




));

// serializing means creating a cookie for a signed in user 

passport.serializeUser(function (user,done) {
    done(null,user.id);
  });


// deserializing means taking value out from the cookie that belongs to a particular user

passport.deserializeUser(function (id,done) { 
    User.findById(id)
    .then((result) => {
        if(result != null )
        {
            return done(null,result);
        }
        else{
            return done(null,false);
        }
        
    }).catch((err) => {
        console.log(`Error in finding the user in deserialize Error: ${err}`);
        return done(err);
    });
 })

// check authentication of the user i.e whether the user is signed in 
// And if yes pass request to the controller's Action
 passport.checkAuthentication =  function (request , response , next) { 
    if(request.isAuthenticated())
    {
        return next();
    }
        return response.redirect('/signIn')
  }

//   req.user contains the current signed in user information from the session cookie 
// And we need to pass it to the Locals for the view

passport.isAuthenticatedUser = function (request , response , next) { 
    if (request.isAuthenticated()) {
        // pass the request.user to response.local
        response.locals.user = request.user;
    }
    next();
 }


 passport.showSignOnPages =  function (request , response , next) { 
    if(request.isAuthenticated())
    {
        console.log(request);
        return null;
    }
        return next();
  }


// export the passport
module.exports = passport;
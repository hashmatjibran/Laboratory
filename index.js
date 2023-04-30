// using express
const express = require('express');

// using Mongoose
const mongoose = require('mongoose');

// using Configuration
const config =require('./Config/config')

// require express session
const session = require('express-session');

//require MongoStore
const MongoStore = require('connect-mongo') 

// using passport
const passport = require('passport');

//using passport-local-Strategy
const passportLocal = require('./Config/passport-local');


// requiring BodyParser
const bodyParser = require('body-parser');

// requiring Cookie parser
const cookieParser = require('cookie-parser');

// using Port
const PORT = 8000;

// requiring the express layouts
const expressLayouts = require('express-ejs-layouts');

const app = express();

// reqiring Sass/Scss
const SassMiddleware = require('node-sass-middleware');

// using Assets
app.use(express.static('./Assets'));

// using layouts
app.use(expressLayouts);
// extracting styles and sripts 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// using body parser to parse request data
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// using cookie parser
app.use(cookieParser()); //used to parse cookies 

// use Sass MiddleWare to convert Sass /Scss into css
app.use(SassMiddleware({
    src:'./Assets/Sass', //the source folder wehre scss / Sass files are present
    dest:'./Assets/Css', //the folder where where compiled css files should be moved or stored
    debug:true, //used for showing the debug information
    outputStyle:'expanded', //the style for showing the 
    prefix:'/Css'//prefix is found in the link tag like :- <link rel="stylesheets" href="prefix/style.css"/>

}));

// using connect-flash 
const flash = require('connect-flash');

// using flash middleWare to set the flash messages into the response object
const flashMiddleware = require('./Config/flashMiddleware');

// using passport and cookie session
app.use(session({
    name:'Laboratory', //name of the session
    secret:'jibby', //the secret key for the session it can also be crypto
    saveUninitialized:true, //dont save this session in db for a not signed in user
    resave:true,   //don't save again and again the same session
    cookie:{    
        maxAge:(1000 * 60 *100) //the age for the cookie to expire it is in milli secs
    },
    store:new MongoStore( //creating the database link were the cookie is to be stored
        {
          mongoUrl:'mongodb://localhost/Auth', //provide the url ofthe db
            autoRemove:'disabled' //dont remove the cookie / session from the db automatically
    },
    function(err){ //A call back function in case an error is thrown
        console.log(err || "connected successfully");
    }
    )
}));

app.use(flash());
app.use(flashMiddleware.setFlash);

app.use(passport.initialize()); //initialize the passport

app.use(passport.session()); //this line of code authenticates the session



app.use(passport.isAuthenticatedUser); //check whether the user is authenticated




// using Routes i.e redirecting to the routes Directory and search in there the file provided
app.use('/',require('./Routes/web'));

// Setting up The Views ans the View Engine
app.set('view engine','ejs');
app.set('views','./ Views');

// listen on port specified
app.listen(PORT,(err)=>{
    if(err)
        {
            console.log(`Error in running the server Error: ${err}`);
        }
});

 

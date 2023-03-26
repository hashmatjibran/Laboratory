// using express
const express = require('express');

// using Mongoose
const mongoose = require('mongoose');

// using Configuration
const config =require('./Config/config')

// require express session
const session = require('express-session');

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
app.use(cookieParser());

// using passport and cookie session

app.use(session({
    name:'Laboratory',
    secret:'jibby',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 *100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.isAuthenticatedUser);



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

 

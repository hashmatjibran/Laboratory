const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const app = express();

const PORT = 8000;
const router = express.Router();

app.use(router);
app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.set('view engine','ejs');
app.set('views','./ Views');
app.listen(PORT,(err)=>{
    if(err)
        {
        console.log(`Error in running the server Error: ${err}`);
        }
});


router.get('/', function (req, res, next) {
    console.log("User Router Working");
    res.end();
});
 

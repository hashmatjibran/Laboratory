const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const app = express();

const PORT = 8000;


app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.use('view engine','ejs');
app.use('views','./ Views');
app.listen(PORT,(err)=>{
    if(err)
        {
        console.log(`Error in running the server Error: ${err}`);
        }
});
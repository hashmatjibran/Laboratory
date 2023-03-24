const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Auth')
.then((result) => {
    console.log("Connected Successfully")
}).catch((err) => {
    console.log("Error in connection")
});
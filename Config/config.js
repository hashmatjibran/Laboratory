const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/Auth')
.then((result) => {
    console.log("Connected Successfully")
}).catch((err) => {
    console.log("Error in connection")
});



module.exports = db;
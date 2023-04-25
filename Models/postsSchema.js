const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    posts:{
        type :String,
        required :true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comments'
        }
    ]
},
    {
    timestamps:true
});
const postsSchema = mongoose.model('posts',postSchema);
module.exports = postsSchema;

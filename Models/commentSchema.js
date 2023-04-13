const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
comment:{
    type:String,
    required :true
},
// comment belongs to a user
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
},
// comments belongs to A post
post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'posts'
}
},
{
    timestamps:true
});

const comments = mongoose.model('comments', commentSchema);
module.exports = comments;
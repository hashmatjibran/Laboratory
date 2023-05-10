const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const AVATAR_FILE = path.join('/uploads/users/avatars');
const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type :String,
        required :true
    },
    name:{
        type:String ,
        required :true
    },
    age:{
        type: Date,
        required :true
    },
    avatar:{
        type: String
    }
},
{
    timestamps: true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'..',AVATAR_FILE));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  })
  
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath = AVATAR_FILE;



const User = mongoose.model('User',userSchema);

module.exports = User;
const posts = require('../Models/postsSchema');

module.exports.createPost = async (request , response)=>{
    posts.create({
        posts:request.body.posts,
        user : request.user._id
    })
    .then((result) => {
        console.log("created successfully")
        return response.redirect('/post');
    }).catch((err) => {
        console.log(`error found while creating a post ${err}`);
    });
}
module.exports.showPosts = async (request , response)=>{
  
    // populating only my posts
    posts.find().populate('user')
    .then((result) => {
        return response.render('posts',{'result':result});
    }).catch((err) => {
        console.log(`error found  : ${err}`);
    });
}

module.exports.myPosts = async (request , response)=>{
  
    // populating only my posts
    posts.find({user:request.session.passport.user}).populate('user')
    .then((result) => {
        return response.render('posts',{'result':result});
    }).catch((err) => {
        console.log(`error found  : ${err}`);
    });
}
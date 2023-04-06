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
module.exports.showPosts = async (resquest , response)=>{
    // posts.find()
    // .then((result) => {
        
    //     

    // }).catch((err) => {
    //     
    // });

    posts.find().populate('user')
    .then((result) => {
        return response.render('posts',{'result':result});
    }).catch((err) => {
        console.log(`error found  : ${err}`);
    });
}
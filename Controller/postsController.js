const posts = require('../Models/postsSchema');
const comments = require('../Models/commentSchema');
module.exports.createPost = async (request , response)=>{
    posts.create({
        posts:request.body.posts,
        user : request.user._id
    })
    .then((result) => {

        return response.redirect('/post');

    }).catch((err) => {

        console.log(`error found while creating a post ${err}`);

    });
}
module.exports.showPosts = async (request , response)=>{
  
    // populating ALL the posts
    posts.find().populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }

    })
    .then((result) => {

        return response.render('posts',{'result':result});
    }).catch((err) => {
        console.log(`error found  : ${err}`);
    });
}

module.exports.myPosts = async (request , response)=>{
    
    // populating only my posts
    posts.find({user:request.user._id}).populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }

    })
    .then((result) => {
        return response.render('posts',{'result':result});
    }).catch((err) => {
        console.log(`Internal server error  : ${err}`);
    });
}

// function to delete a  post
// TODO
//  compare the user who has created the post and the user who wants to delete the post
// if everything is alright then delete the post as well as delete the comments assciated with it

module.exports.deletePost = (request , response)=>{
  
// check whether the post exsists or not 

 posts.findById(request.query.postId)

 .then((result) => {

    // and if exists ;

    if ( result!=null && result != undefined && result !='') {

        // means post is present now it is time to check authorization
        
        if (result.user == request.user.id) {
            // user is authorized now

            // delete the post 
            posts.deleteOne({_id:request.query.postId})
            .then((result) => {
                if (result !="" && result !=null && result !=undefined) {

                    // now delete every comment related to this post
                    // example of Model.deleteMany
                    // await Character.deleteMany({ name: /Stark/, age: { $gte: 18 } });
                     // returns {deletedCount: x} where x is the number of documents deleted
                  comments.deleteMany({post:request.query.postId}).exec();
                }
            })
            
            
            
    }
}
 }).catch((err) => {

    console.log(`internal server error:- ${err} `);

 });
// redirecting back to posts
return response.redirect("back");

}
const posts = require('../Models/postsSchema');
const comments = require('../Models/commentSchema');
const User = require('../Models/userSchema');

module.exports.createPost = async (request , response)=>{
   try {
      let post =  await posts.create({
            posts:request.body.posts,
            user : request.user._id
        });
        console.log(post.user);
    let PostBy = await User.findById(post.user);
        console.log(PostBy.name);
        if(request.xhr){
            return response.status(200).json({
                data:post,
                message:"post created successfully",
                postedBy : `${PostBy.name}`
            });
        }

            request.flash('info','Post Created Successfully');
            return response.redirect('back');
   } 
    catch (error) {
        request.flash('error',"Post Could not be created at the Moment Please try After Sometime");
    }
}



// module.exports.showPosts = async (request , response)=>{
  
//     // populating ALL the posts
//     posts.find().populate('user')
//     .populate({
//         path:'comments',
//         populate:{
//             path:'user'
//         }

//     })
//     .then((result) => {

//         return response.render('posts',{'result':result});
//     }).catch((err) => {
//         console.log(`error found  : ${err}`);
//     });
// }

module.exports.myPosts = async (request , response)=>{
    // populating only my posts
    try{
        let result =  await posts.find({user:request.user._id}).populate('user')
                            .populate({
                                    path:'comments',
                                    populate:{
                                        path:'user'
                                    }

                            });

        if(result.length > 0)
        {
            request.flash('info',`You have posted ${result.length} posts`);
        }
        else{
            request.flash('info',`You have 0 posts`);
        }
        return response.render('posts',{'result':result}); 

    } catch(err) {
        request.flash('error',`Internal server error  : ${err}`);
    }
}

// function to delete a  post
// TODO
//  compare the user who has created the post and the user who wants to delete the post
// if everything is alright then delete the post as well as delete the comments assciated with it

module.exports.deletePost = async (request , response)=>{
  
 try {
    // check whether the post exsists or not 

    let result = await posts.findById(request.query.postId);
    // and if exists ;
        // means post is present now it is time to check authorization
        if (result.user == request.user.id) {
            // user is authorized now

            // delete the post 
         let deletePost = await posts.deleteOne({_id:request.query.postId});

                    // now delete every comment related to this post
                    // example of Model.deleteMany
                    // await Character.deleteMany({ name: /Stark/, age: { $gte: 18 } });
                     // returns {deletedCount: x} where x is the number of documents deleted

                  await comments.deleteMany({post:request.query.postId});

                  if(request.xhr)
                  {
                    return response.status(200).json({
                        id:request.query.postId
                    });
                  }


                  request.flash('warning',"Post Deleted Successfully");
    }

    return response.redirect("back");

 }catch(err) {

    request.flash('error',`Internal Server Error ${err}`);
    return;

 }

}

const post = require('../../../Models/postsSchema');
const comments = require('../../../Models/commentSchema');
module.exports.index = async function (request , response) {

    try {
        
        let posts = await post.find()
    .sort('-createdAt')
    .populate('user')
     .populate({
         path:'comments',
         populate:{
             path:'user'
         }
   
     });


     return response.status(200).json({
            message: 'list of Posts',
            post: posts
        });

    } catch (error) {
        return response.status(500).json({
            message: 'internal server error'
        });
    }
        
}

module.exports.delete = async function (request , response) { 

    
    try {

        let findPost = await post.findById(request.params.id);

    if(findPost.user == request.user.id)
    {
        let deletePost = await post.deleteOne({_id:request.params.id});
        await comments.deleteMany({post:request.params.id});
        return response.status(200).json({
            message: "post and its associated comments deleted"
        });
    }else{
        return response.status(404).json({
            message: "You cannot delete this post "
        });
    }

    } catch (error) {
        console.log(error)
        return response.status(500).json({
            message: "Internal server error"
        });
    }
    


 }
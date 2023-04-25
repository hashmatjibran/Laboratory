const comment = require('../Models/commentSchema');

const post = require('../Models/postsSchema');

module.exports.createComment = function(request , response)
{
// checking whether the post is present or not

    post.findById(request.body.post_id)
    .then((result) => {

        // if post is present  the create a comment and also update the post which means store the comment id in that post
        
        if(result!=null && result != '' && result != undefined)
        {
            // creating  a  comment
            comment.create({
                comment:request.body.comment,
                user : request.user._id,
                post:request.body.post_id
            })
            .then((result2) => {
                // storing the comment id inside the posts
                // updating the post collection inside the mongodb
                result.comments.push(result2);
                result.save();

                return response.redirect('/post');
            
            })
        }
        
    }).catch((err) => {
       
        console.log(`Internal server Error :- ${err}`);

    });
    
}
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

// delete a comment

module.exports.deleteComment = (request , response)=>{
    
   

    comment.findById(request.params.id)
    .then((result) => {
        // if found check for authorization to delete the comment
        
        if(request.user.id == result.user )
        {
            // when the user matched delete the comment

            comment.findByIdAndDelete(request.params.id)
            .then((result) => {

                post.findById(result.post)
                .then((result) => {

                      var filterComments = result.comments.filter((value)=>{
                         return value != request.params.id;
                        });

                    result.comments = filterComments;
                    result.save();
                console.log("comment deleted success")

                })
                
                // you will also need to delete its reference from the posts
            
            });
            
        }



    }).catch((err) => {
        
    });

    return response.redirect("back");
}
const comment = require('../Models/commentSchema');

const post = require('../Models/postsSchema');


// creating and storing comment id in posts here
module.exports.createComment = async function(request , response)
{
    try {
        
    
    // checking whether the post is present or not

    let getPost = await post.findById(request.body.post_id)
        // .then((result) => {

            // if post is present  the create a comment and also update the post which means store the comment id in that post
            
            if(getPost!=null && getPost != '' && getPost != undefined)
            {
                // creating  a  comment
                let createComment = await comment.create({
                    comment:request.body.comment,
                    user : request.user._id,
                    post:request.body.post_id
                });
                
                    // storing the comment id inside the posts
                    // updating the post collection inside the mongodb
                    getPost.comments.push(createComment);
                    getPost.save();

                request.flash('info',"Commented successfully");
                    return response.redirect('back');
                
                
            }
        
    } catch (error) {
        console.log(`Internal server Error :- ${error}`);
    }
    
}

// delete comments here
module.exports.deleteComment = async (request , response)=>{
    
   try {
            let commentFound = await comment.findById(request.params.id);

            // if found check for authorization to delete the comment
            if(request.user.id == commentFound.user )
            {
                // when the user matched delete the comment
            let deleteComment =  await comment.findByIdAndDelete(request.params.id);
            

                /*  old school way i.e getting the comments, filtering them and then ressaving them inside the db.
                post.findById(deleteComment.post)
                    .then((deleteComment) => {

                        var filterComments = deleteComment.comments.filter((value)=>{
                            return value != request.params.id;
                            });

                        deleteComment.comments = filterComments;
                        deleteComment.save();

                    })*/
                    // easy way to do the same task provided by the inbuilt function  of the mongoose

                    //  Model.findByIdAndUpdate(id, update, options)  // returns Query
                   await post.findByIdAndUpdate(deleteComment.post,{$pull:{comments:request.params.id}}).exec();  

                   request.flash('warning','Comment Deleted Successfully');
            }




   } catch (error) {
         console.log(`Internal server error :- ${error}`);
   }

    return response.redirect("back");

}
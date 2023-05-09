{
    console.log("hello");
   let newPostForm = $('#new_post_form');

   $(newPostForm).submit(function (e) { 
    e.preventDefault();

    $.ajax({
        type: "post",
        url: "/post/createPost",
        data: newPostForm.serialize(),
        success: function (response) {
            // passing the data to display
            let newPost = newPostDom(response);

            // prepending a new post to the list of posts
            $('#listOfPosts').prepend(newPost);
            deletePost($(' .delete_Post_Link', newPost));

        },
        error: function (error) {
            console.log(error);
        }
    });


   });

   let newPostDom = function (post) {
    $('#textArea').val("");
       return  `
       <li id="post_${ post.data._id}">
        <p >
            ${post.data.posts}
            
            <a id="delete_Post_Link_${ post.data._id}" class="delete_Post_Link" href="/post/delete_post/?postId=${ post.data._id}">
             <i class="fa-solid fa-trash"></i>
            </a> 

            <br>

            <form id="commentForm" action="/comment/create" method="post">
            <input  type="text" name="comment" class="comment">  
            <input type="hidden" name="post_id" value="${ post.data._id}">
            <input type="submit" value="Comment">
            </form>

            <small>
                Posted By:-  ${ post.postedBy }
            </small>  
        </p>
        </li>
        `;
    
        
   }
   
 
     
  
   
function deletePost(deleteLink) {
    $("#"+deleteLink.prop('id')).click(function (e) { 
        e.preventDefault();
        $.ajax({
            type: "get",
            url: deleteLink.prop('href'),
            success: function (response) {
                console.log(response);
                $(`#post_${response.id}`).remove();
            },
            error: function (error) { 
                console.log(error.responseText);
             }
        });
    });
    
}

}
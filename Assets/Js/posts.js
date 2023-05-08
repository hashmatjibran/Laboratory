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
            newPostDom(response);
        },
        error: function (error) {
            console.log(error);
        }
    });


   });

   let newPostDom = function (post) {
       let newPost = `
        <p>
            ${post.data.posts}
            
            <a href="/post/delete_post/?postId=${ post.data._id}"> <i class="fa-solid fa-trash"></i></a> 

            <br>

            <form action="/comment/create" method="post">
            <input type="text" name="comment" class="comment">  
            <input type="hidden" name="post_id" value="${ post.data.id}">
            <input type="submit" value="Comment">
            </form>

            <small>
                Posted By:-  ${ post.postedBy }
            </small>  
        </p>
        `;
    $('#textArea').val("");
       return $('#listOfPosts').prepend(newPost);
        
   }



}
{
    let commentForm =$('#commentForm');
    commentForm.submit(function (e) { 
        e.preventDefault();
        
        $.ajax({
            type: "post",
            url: "/comment/create",
            data: commentForm.serialize(),
            success: function (response) {
                let commentsDiv = $('#commentsDiv');
                let content = commentsDom(response);
                commentsDiv.prepend(content);
                deleteComment($(' .delete_comment',content));
                commentForm.removeData(element);
                
                console.log(response);
            },
            error: function (error) {
                console.log(`inside error ${error}`);
            }
        });
    });

    // function to populate Comments on Dom
    let commentsDom = function(commentData){
        return `<li id="comment_${commentData.data._id}">
            ${commentData.data.comment}
                <br>
                commented by :- ${commentData.user}
                    <a id="comment_no_${commentData.data._id}" class="delete_comment" href="/comment/deleteComment/${commentData.data._id}">
                    <i class="fa-solid fa-trash"></i> 
                    </a>
                </li>    
        `;
    }

    // function to delete the comment
let deleteComment = function(deleteLink){

    $("#"+deleteLink.prop('id')).click(function (e) { 
        e.preventDefault();
        console.log('inside ajax');
        $.ajax({
            
            type: "get",
            url: deleteLink.prop('href'),
            success: function (response) {
                $(`#comment_${response.id}`).remove();
            },
            error: function (error) { 
                console.log(error.responseText);
             }
        });
    });

}

}
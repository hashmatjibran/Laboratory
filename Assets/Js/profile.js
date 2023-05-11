{
    // get the file input tag and check for the value changed using onChange() event
    let profilePic = $('#profile_pic_input');
    profilePic.change(function(e) {

        // create a url for the selected image so that it can be displayed before uploading
        const imageSrc = URL.createObjectURL(e.target.files[0]);

        // Get the image tag in which the image is being displayed
        let imgTag = $('#profile_pic');

        // Now Assign the src to the image using the attr() in jquery
       imgTag.attr('src', imageSrc);
    });
    
}
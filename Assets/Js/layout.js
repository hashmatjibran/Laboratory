{
    let dropdownButton = $('.dropdown-toggle');
    $('.dropdown').hide();
    dropdownButton.click(function (e) { 
        e.preventDefault();
        $('.dropdown').toggle();
    });
   
}
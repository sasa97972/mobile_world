var topButton = $(".top");
topButton.fadeOut(1);
$(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
        topButton.fadeIn();
    } else {
        topButton.fadeOut();
    }
});
topButton.on("click", function () {
    $('body,html').animate({
        scrollTop: 0
    }, 1200);
    return false;
});
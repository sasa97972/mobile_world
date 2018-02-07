$('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
    slidesToShow: 3,
    infinite: true,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    centerMode: true,
    focusOnSelect: true,
    nextArrow: "<span class='custom-next'><i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i></span>",
    prevArrow: "<span class='custom-prev'><i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i></span>",
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                arrows: false
            }
        },
    ]
});

$(".product__slider-item_popup").magnificPopup({
    type: "image",
    closeBtnInside: false,
    closeOnContentClick: true,
});
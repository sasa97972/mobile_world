jQuery(document).ready(function($) {
    $(".nav__system-cart").click(function () {
        $(".cart__modal").fadeIn(500);
    });

    $(".cart__close").click(function () {
        $(".cart__modal").fadeOut(500);
    });
});
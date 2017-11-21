(function ($) {

    // SCROLL TO TOP
    var scrollToTop = $(".scrollToTop");
    if (scrollToTop.length) {
        $(window).scroll(function () {
            if ($(window).scrollTop() > 100) {
                scrollToTop.addClass("scrollToTop--show");
            } else {
                scrollToTop.removeClass("scrollToTop--show");
            }
        });
        scrollToTop.click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });
    }

    // SMOOTH ANCHOR
    if ($(".smoothAnchor").length) {
        $('a').click(function () {
            $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top
            }, 500);
            return false;
        });
    }
	
})(jQuery);
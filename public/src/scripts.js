$(document).ready(function(){

    $( ".down-arrow" ).on( "click", function() {
        $('html, body').animate({
            scrollTop: $('#info').offset().top - 70
        }, 'slow');
    });

    $(document).scroll(function() {
        var scroll = $(document).scrollTop();
        var o = (scroll - 90)/ 200;
        var bso = (o - 1) / 10
        console.log("scroll:"+scroll);
        var so = 1 - scroll / 200;
        console.log("so:"+so);

        $("header").css("background","rgba(85, 85, 85, "+ o +")");
        $("#splash-text").css("opacity",+ so);

//        $("header").css("background","rgba(187, 196, 205, "+ o +")");
//        $("header").css("box-shadow","0 0px 20px rgba(80,80,80,"+bso+")");

    });

});
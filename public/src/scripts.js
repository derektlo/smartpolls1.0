$(document).ready(function(){

    $( ".down-arrow" ).on( "click", function() {
        $('html, body').animate({
            scrollTop: $('#info').offset().top - 70
        }, 'slow');
    });

    $(document).scroll(function() {
        var o = ($(document).scrollTop() - 90)/ 200;
        var bso = (o - 1) / 10
        $("header").css("background","rgba(85, 85, 85, "+ o +")");
//        $("header").css("background","rgba(187, 196, 205, "+ o +")");
//        $("header").css("box-shadow","0 0px 20px rgba(80,80,80,"+bso+")");

    });

});
$(document).ready(function () {
    $(window).scroll(function () { 
        if($('html, body').scrollTop() > 300){
            $(".top-navbar .navbar").addClass("after_scroll");
            // console.log("hihi");
        }else{
            $(".top-navbar .navbar").removeClass("after_scroll");
            // console.log("hehe");
        }
    });


    //mat chuong
    var count_mess =  document.getElementById("count_mess").innerHTML;
    if(count_mess == 0){
        $("#bell_1").addClass("bell_hidden");
    }else{
        $("#bell_1").removeClass("bell_hidden");
    }


});
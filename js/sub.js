// 서브페이지용 js
$(document).ready(function(){
	infoEvents();
	$("#top-btn").on("click", function() {
        $('html, body').stop().animate({scrollTop: 0}, 600);
        $(this).fadeOut(200);
    })
})

$(window).resize(function(){
	var winWidth = $(window).width();
	console.log(winWidth);
	$('#navbar-allmenu').removeClass('show');
});

$(window).scroll(function() {
	console.log('scroll')
	infoEvents()
});

function infoEvents(){
    let scrollTop = $(window).scrollTop();
    if(scrollTop > $('.cont-wrap div:first').offset().top) {
        $('#top-btn').stop().fadeIn();
		$('.navbar').addClass('on');
    } else {
        $('#top-btn').stop().fadeOut();
		$('.navbar').removeClass('on');
    }
}
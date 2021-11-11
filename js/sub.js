// 서브페이지용 js
$(document).ready(function(){
	infoEvents();
	$("#top-btn").on("click", function() {
        $('html, body').stop().animate({scrollTop: 0}, 600);
        $(this).fadeOut(200);
    })
})

$(window).resize(function(){
	// resize시 class 리셋
	$('#navbar-allmenu').removeClass('show');
});

$(window).scroll(function() {
	//console.log('scroll')
	infoEvents()
});

function infoEvents(){
    let scrollTop = $(window).scrollTop();
	var winWidth = $(window).width();
	//console.log('infoEvents 발생, 넓이는 ' + winWidth);
	if(scrollTop > $('.cont-wrap div:first').offset().top) {
		// 스크롤을 내릴 때
		$('#top-btn').stop().fadeIn();
		$('.navbar').addClass('on');
	} else {
		// 스크롤을 다 올렸을 때
		$('#top-btn').stop().fadeOut();
		// 1281보다 좁으면 (mobile)
		if(winWidth < 1281){
			$('.navbar').addClass('on');
		// 1281보다 넓으면 (pc)
		} else {
			$('.navbar').removeClass('on');
		}
	}
}
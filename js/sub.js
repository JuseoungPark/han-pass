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
	navbarShow();
});

$(window).scroll(function() {
	infoEvents();
});


// resize시 navbar class mobile/pc 분기 이벤트
function navbarShow() {
	// 1281보다 좁으면 (mobile)
	let winWidth = $(window).width();
	if(winWidth < 1281){
		$('.navbar').addClass('on');
	}
	// 1281보다 넓으면 (pc)
	else {
		$('.navbar').removeClass('on');
	}
}

function infoEvents(){
    let scrollTop = $(window).scrollTop();
	if(scrollTop > $('.cont-wrap div:first').offset().top) {
		// 스크롤을 내릴 때
		$('#top-btn').stop().fadeIn();
		$('.navbar').addClass('on');
	} else {
		// 스크롤을 다 올렸을 때
		$('#top-btn').stop().fadeOut();
		navbarShow();
	}
}
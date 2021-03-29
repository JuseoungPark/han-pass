var myFullpageCTL;

$(document).ready(function(){
	makeFullPage();
	makeSwiper();
	mainEvents();
})

$(window).resize(function(){
	console.log('resize')
	// $.fn.fullpage.destroy('all');
	// makeFullPage();
	//mainEvents()	
});
$(window).scroll(function() {
	console.log('scroll')
	mainEvents()
});

function makeFullPage(){
	$('.fullpage-wrapper').fullpage({
		//options here
		licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
		offsetSections: true,
		scrollOverflow: true,
		v2compatible: true,
		css3:true,
		easing: 'easeInOutCubic',
		scrollingSpeed: 800,
		// scrollOverflowEndPrevent: { delay: 500, reversal: false },
		scrollOverflowOptions: {
			disablePointer: true,
			scrollbars: true
		},
		fitToSection: true,
		afterRender: function(){
			// $.fn.fullpage.silentMoveTo(1);
		},
		afterLoad: function(a, index){
			// console.log(index);
			if(index == 3){
				$(".card.float-right ul").addClass("active");
			}else{
				$(".card.float-right ul").removeClass("active");
			}
		},
		onLeave: function(index, nextIndex, direction){
			//내려갈때
			if(direction == 'down'){
				//내려갈때
				if(index - nextIndex <= -1){
					$('#top-btn').fadeIn();
					$('.navbar').removeClass('von');
					$('.navbar').addClass('on');
				}
			}
			//올라갈때
			if(direction == 'up'){
				//한칸씩 올라갈때
				if(index - nextIndex == 1){
					if(index == 2 && nextIndex == 1 && direction == 'up'){
						$('#top-btn').fadeOut();
						$('.navbar').removeClass('von');
						$('.navbar').removeClass('on');
						}
				}
				//여러칸 올라갈때
				if(index - nextIndex > 1){
					$('#top-btn').fadeOut();
					$('.navbar').removeClass('von');
					$('.navbar').removeClass('on');
				}
			}
		},
	});	
	//methods
	// $.fn.fullpage.setAllowScrolling(false);
}
function makeSwiper(){
	//SWIPER - TOP VISUAL AREA PC / MOBILE
	var swiperAutoplayDelay = 4000;
	// var tick;
	var swiper = new Swiper('.swiper-container', {
		navigation: {
			nextEl: '.carousel-control-next',
			prevEl: '.carousel-control-prev'
		},
		loop: true,
		speed : 1100,
		autoplay: {
			delay: swiperAutoplayDelay,
			disableOnInteraction: true,
			stopOnLast: true,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		on: {
			// afterInit: () => {
			// },
			slideChangeTransitionStart: function() {
				console.log("slideChangeTransitionStart")
				$(".swiper-slide-active").removeClass("effect")
				let visual5 = $(".swiper-slide-active").find('.main-visual-bg-05').length
				if(visual5){
					$('.navbar').addClass('von');
				}else{
					$('.navbar').removeClass('von');
				}
			},
			slideChangeTransitionEnd: function() {
				$(".swiper-slide-active").addClass("effect")
				console.log("slideChangeTransitionEnd")
			},
			// progress: function(){
			// 	
			// }
		},
		preloadImages: true,
		lazyLoading: true,
		lazyLoadingInPrevNext: true,
		watchSlidesProgress: true,
		watchSlidesVisibility: true
	});
	swiper.autoplay.stop();
}

function mainEvents() {
	var winWidth = $(window).width();
	// console.log(winWidth)
	var controller = new ScrollMagic.Controller();

	var scene1 = new ScrollMagic.Scene({
		triggerElement: "#main .main-conts-01", //트리거 설정
		triggerHook: 0.8
	})
	.setClassToggle("#main .main-conts-01", "effect")
	.addTo(controller)

	var scene2 = new ScrollMagic.Scene({
		triggerElement: "#main .main-conts-02", //트리거 설정
		triggerHook: 0.8
	})
	.setClassToggle("#main .main-conts-02", "effect")
	.addTo(controller)

	var scene3 = new ScrollMagic.Scene({
		triggerElement: "#main .main-conts-03", //트리거 설정
		triggerHook: 0.8
	})
	.setClassToggle("#main .main-conts-03", "effect")
	.addTo(controller)

	var scene4 = new ScrollMagic.Scene({
		triggerElement: "#main .main-conts-04", //트리거 설정
		triggerHook: 0.8
	})
	.setClassToggle("#main .main-conts-04", "effect")
	.addTo(controller)
}

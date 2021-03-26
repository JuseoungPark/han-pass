$(document).on("click", "a", function (e){
	e.preventDefault();
});

$(document).ready(function() {
	$('.carousel').carousel({
		interval: 2000
	})
	// var i = 0;
	// $(".marquee-left>li").last().addClass("last");
	// $(".marquee-left>li").each(function() {
	// 	var $this = $(this);
	// 	$this.css("top", i);
	// 	i += $this.outerHeight(true);
	// 	doMarquee($this);
  	// });
	// var j = 0;
	// $(".float-right>.marquee>li").last().addClass("last");
	// $(".float-right>.marquee>li").each(function() {
	// 	  var $this = $(this);
	// 	  $this.css("top", j);
	// 	  j += $this.outerHeight(true);
	// 	  doMarquee($this);
	// });	
});

function doMarquee($ele) {
	var top = parseInt($ele.css("top"));
	if(top < -400) { //bit arbitrary!
		var $lastEle = $(".last");
		$lastEle.removeClass("last");
		$ele.addClass("last");
		var top = (parseInt($lastEle.css("top")) + $lastEle.outerHeight(true));
		$ele.css("top", top);
	}
	$ele.animate({ top: (parseInt(top)-370) },2000,'linear', function() {doMarquee($(this))});
}

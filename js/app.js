
$(document).ready(function(){
    $("#go-sns").on("click", function() {
        $(".sns-box").addClass("on")
    })

    $('#navbar-allmenu').on('hide.bs.collapse', function () {
        $(".sns-box").removeClass("on")
    })
    
	$(".dropdown-select .dropdown-item:not(.disabled)").on("click", function() {
		let text = $(this).html()
		$(".dropdown-select .dropdown-item").removeClass('active')
		$(this).addClass('active')
		$(this).parents('.dropdown-select').children(".dropdown-toggle").html(text)
    })
})

$(document).on("click", "a", function (e){
	e.preventDefault();
});
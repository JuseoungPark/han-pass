/*!
 *  v1.0.0
 * Copyright 2021 
 */

$(document).on("click", "a", function (e){
	e.preventDefault();
});

$('.carousel').carousel({
	interval: 2000,
	wrap:false
})
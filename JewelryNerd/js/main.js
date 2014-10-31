(function($){

/***************Modal for review.html***********************/
//adds listener to add review button
$('.modalClick').on('click', function(e){
	e.preventDefault();
	$('#overlay')
	.fadeIn()
	.find('#modal')
	.fadeIn();
});

$('.close').on('click', function(e){
	e.preventDefault();
	$('#overlay')
	.fadeOut()
	.find('#modal')
	.fadeOut();
	
});

/********************Date Picker (on add modal review.html)***********************/
$(".myDatePicker").datepicker();

})(jQuery);//end scope
$(document).ready(function()
{
	$('.slider__bxslider').bxSlider({
		pager: false,
		prevSelector: $('#slider__nav-button_prew'),
		nextSelector: $('#slider__nav-button_next'),
		prevText: '',
		nextText: '',
		slideWidth: '660'
	});
});
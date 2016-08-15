$(document).ready(function()
{
	/* freeman freepopup */
	$('a.freepopup').on('click', function(e)
	{
		var href = $(this).attr('href');
		if (href)
		{
			e.preventDefault();
			$('.freepopup-c' + href).show();
			$('html').addClass('freepopup-html');
		}
	});
	$('.freepopup-c').on('click', '.freepopup-c__close', function()
	{
		$(this).closest('.freepopup-c').hide();
		$('html').removeClass('freepopup-html');
	});
	/* END freeman freepopup */

	$('.form__input-phone-js').mask("+7 ( 9 9 9 ) 9 9 9 - 9 9 - 9 9");

	$('.slider__bxslider').bxSlider({
		pager: false,
		prevSelector: $('#slider__nav-button_prew'),
		nextSelector: $('#slider__nav-button_next'),
		prevText: '',
		nextText: '',
		slideWidth: '660'
	});
});
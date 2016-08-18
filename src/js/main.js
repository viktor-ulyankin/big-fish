/* freeman freepopup */
function freepopup(href)
{
	if (href)
	{
		$('.freepopup-c' + href).show();
		$('html').addClass('freepopup-html');
	}
}
function freepopupHideAll()
{
	$('.freepopup-c').hide();
	$('html').removeClass('freepopup-html');
}
/* END freeman freepopup */

$(document).ready(function()
{
	var copyFormClone = $('#copy-form').clone();
	$('.freepopup-c#copy-form-clone .freepopup-c__content').append(copyFormClone);

	/* freeman freepopup */
	$('a.freepopup').on('click', function(e)
	{
		var href = $(this).attr('href');
		if (href)
		{
			e.preventDefault();
			freepopup(href);
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

	$('form[action="post.php"]').on('submit', function(e)
	{
		e.preventDefault();
		var formEVENT = e.target.elements.EVENT.value;
		var formNAME = e.target.elements.NAME.value;
		var formPHONE = e.target.elements.PHONE.value;
		if (formEVENT && formNAME && formPHONE)
		{
			$.ajax({
				type: 'POST',
				url: 'post.php',
				data: 'EVENT=' + formEVENT + '&NAME=' + formNAME + '&PHONE=' + formPHONE,
				success: function(msg)
				{
					var val = parseInt(msg);
					if (val)
					{
						freepopupHideAll();
						freepopup('#thank-you');
					}
				},
				error: function(error)
				{
					console.log('error: ' + error);
				}
			});
		}
	});

	$('.parallax-spot-js').parallax();
});
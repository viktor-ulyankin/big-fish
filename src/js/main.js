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

function raysScroll()
{
	var scrollTop = parseInt($(window).scrollTop());
	var windowHeight = parseInt($(window).height());
	var scrollBottom = $(window).scrollTop() + windowHeight;
	var degPXTop = 1000;
	var halfImgHeight = 1750; // or (3160 / 2)
	var divider = 25;
	var maxDegMod = 35;
	var elRays = $('#rays-js');
	elRays.children().each(function(e)
	{
		var itemTop = parseInt($(this).data('top')) + degPXTop;
		var itemBottom = itemTop + halfImgHeight;
		if (scrollBottom > itemTop && scrollTop < itemBottom)
		{
			var itemDeg = ((halfImgHeight - (scrollBottom - itemTop)) / divider) - maxDegMod;
			if ($(this).hasClass('rays__item-right'))
			{
				itemDeg = itemDeg * -1;
			}
			if (itemDeg <= (maxDegMod * -1))
			{
				changeDeg($(this), maxDegMod * -1);
			}
			else if (itemDeg >= maxDegMod)
			{
				changeDeg($(this), maxDegMod);
			}
			else
			{
				changeDeg($(this), itemDeg);
			}
		}
		else
		{
			var maxDegModTop = maxDegMod;
			var maxDegModBottom = maxDegMod * -1;
			if ($(this).hasClass('rays__item-right'))
			{
				maxDegModTop = maxDegMod * -1;
				maxDegModBottom = maxDegMod;
			}
			if (scrollBottom < itemTop)
			{
				changeDeg($(this), maxDegModTop);
			}
			if (scrollTop > itemBottom)
			{
				changeDeg($(this), maxDegModBottom);
			}
		}
	});

}

function changeDeg(thiss, deg)
{
	thiss.css({'-webkit-transform': 'rotate(' + deg + 'deg)', 'transform': 'rotate(' + deg + 'deg)'});
}

function orderCollFixedFalling(thiss)
{
	var windowHeight = parseInt($(window).height());
	var scrollTop = $(window).scrollTop();
	var scrollBottom = (scrollTop + windowHeight) - 25;
	thiss.addClass('order-call-fixed_animated');
}

$(document).ready(function()
{
	$('.header__logo-fish').addClass('header__logo-fish-js');
	setTimeout(function()
	{
		$('.header__logo-rays').addClass('header__logo-rays-js');
	}, 600);
	setTimeout(function()
	{
		$('.header__logo-title').addClass('header__logo-title-js');
	}, 700);

	setTimeout(function()
	{
		$('.body__generate-iframe-js').each(function()
		{
			var iframeWidth = $(this).data('width');
			var iframeHeight = $(this).data('height');
			var iframeSRC = $(this).data('src');
			if (iframeWidth && iframeHeight && iframeSRC)
			{
				$(this).html('<iframe width="' + iframeWidth + '" height="' + iframeHeight + '" src="' + iframeSRC + '" frameborder="0" allowfullscreen webkitAllowFullScreen mozallowfullscreen></iframe>');
			}
		});

		$('.slider__bxslider').bxSlider({
			pager: false,
			prevSelector: $('#slider__nav-button_prew'),
			nextSelector: $('#slider__nav-button_next'),
			prevText: '',
			nextText: '',
			slideWidth: '660',
			onSlideBefore: function($slideElement, oldIndex, newIndex)
			{
				var el = $('.slider__bxslider .body__generate-iframe-js[data-n=' + oldIndex + '] iframe');
				var attrSRC = el.attr('src');
				el.removeAttr('src');
				el.attr('src', attrSRC);
			}
		});
	}, 2500);

	var copyFormClone = $('#copy-form').clone();
	$('.freepopup-c#copy-form-clone .freepopup-c__content').append(copyFormClone);

	$('.form__input-phone-js').mask("+7 ( 9 9 9 ) 9 9 9 - 9 9 - 9 9");

	$('.parallax-spot-js').parallax();

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

	var elOrderCallFixed = $('#order-call-fixed');
	raysScroll();
	orderCollFixedFalling(elOrderCallFixed);
	$(window).on('scroll', function()
	{
		raysScroll();
		orderCollFixedFalling(elOrderCallFixed);
	});

	$(window).on('resize', function()
	{
		raysScroll();
		orderCollFixedFalling(elOrderCallFixed);
	});
});
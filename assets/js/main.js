$(document).ready(function() {
	var body = $('body'),
		filterLink = $('.filter-item-link'),
		popupImage = $('.popup-image'),
		popupVideo = $('.popup-video');

	body.on('mouseover', '.logo', () => {
		$('.header').addClass('header-hover');
	});
	body.on('mouseout', '.logo', () => {
		$('.header').removeClass('header-hover');
	});

	body.on('click', '.filter .filter-item-link', function () {
		filterLink.removeClass('active');
		$(this).addClass('active');

		var filter = $(this).attr('data-cat');

		$('.country-item').each(function () {
			if (filter !== $(this).attr('data-cat') && filter !== 'all') {
				$(this).addClass('not-filter');
			} else {
				$(this).removeClass('not-filter');
			}
		});
	});

	body.on('click', '.country-item-zoom', function () {
		body.addClass('popups');
		popupImage.addClass('open-popup');

		var img = $(this).attr('data-image');

		if (img) {
			popupImage.find('.image').append('<img src=' + img + '>');
		} else {
			popupImage.find('.image').append('<img src="https://placehold.it/1200x600">');
		}


		body.on('click', '.open-popup .button-close', function () {
			body.removeClass('popups');
			popupImage.removeClass('open-popup');
			popupImage.find('.image img').remove();
		});
	});

	body.on('click', '.country-item-play', function () {
		body.addClass('popups');
		popupVideo.addClass('open-popup');

		var video = $(this).attr('data-video');

		if (video) {
			popupVideo.find('.video').append('<iframe src="' + video + '"frameborder="0" allowfullscreen></iframe>');
		} else {
			popupVideo.find('.video').append('<img src="https://placehold.it/1200x600">');
		}


		body.on('click', '.open-popup .button-close', function () {
			body.removeClass('popups');
			popupVideo.removeClass('open-popup');
			popupVideo.find('.video iframe').remove();
		});
	});
});
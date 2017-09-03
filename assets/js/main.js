$(document).ready(function() {
	const body = $('body');
	const filterLink = $('.filter-item-link');

	body.on('mouseover', '.logo', () => {
		$('.header').addClass('header-hover');
	});
	body.on('mouseout', '.logo', () => {
		$('.header').removeClass('header-hover');
	});

	body.on('click', '.filter .filter-item-link', function () {
		filterLink.removeClass('active');
		$(this).addClass('active');

		const filter = $(this).attr('data-cat');

		$('.country-item').each(function () {

			if (filter !== $(this).attr('data-cat') && filter !== 'all') {
				$(this).addClass('not-filter');
			} else {
				$(this).removeClass('not-filter');
			}
		});

	});
});

const sliders = document.querySelectorAll('.country-item');
Siema.prototype.addArrows = function() {
	this.prevArrow = document.createElement('button');
	this.nextArrow = document.createElement('button');
	this.prevArrow.classList.add('prev-button');
	this.nextArrow.classList.add('next-button');

	this.selector.appendChild(this.prevArrow);
	this.selector.appendChild(this.nextArrow);

	this.prevArrow.addEventListener('click', () => this.prev());
	this.nextArrow.addEventListener('click', () => this.next());
}
for(const siema of sliders) {
	const instance = new Siema({
		selector: siema,
		loop: true
	});
	instance.addArrows();
}

function Popup({ type, link }) {
	const popupElement = document.createElement('div');
	popupElement.classList.add('popup');

	switch (type) {
		case 'image': {
			const imgElement = document.createElement('img');
			imgElement.src = link;
			popupElement.classList.add('popup__img');
			popupElement.appendChild(imgElement);
			break;
		}
		case 'video': {
			const videoElement = document.createElement('iframe');
			videoElement.src = link;
			popupElement.classList.add('popup__video');
			popupElement.appendChild(videoElement);
			break;
		}
	}
}

function VideoPopup({ link }) {
	const videoPopup = new Popup({
		type: 'video',
		link
	});
	videoPopup.classList.add('popup_type_video');

	return videoPopup;
}

// $0.addEventListener('click', (e) => {
// 	const videoLink = e.target.getElementsByClassName('video-link')[0].href;
// const bPopup = new Popup({ videoLink });
// document.appendChild(bPopup);
// });
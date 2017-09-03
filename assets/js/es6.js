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
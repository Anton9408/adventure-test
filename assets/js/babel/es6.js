'use strict';

var sliders = document.querySelectorAll('.country-item');
Siema.prototype.addArrows = function () {
	var _this = this;

	this.prevArrow = document.createElement('button');
	this.nextArrow = document.createElement('button');
	this.prevArrow.classList.add('prev-button');
	this.nextArrow.classList.add('next-button');

	this.selector.appendChild(this.prevArrow);
	this.selector.appendChild(this.nextArrow);

	this.prevArrow.addEventListener('click', function () {
		return _this.prev();
	});
	this.nextArrow.addEventListener('click', function () {
		return _this.next();
	});
};
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	for (var _iterator = sliders[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var siema = _step.value;

		var instance = new Siema({
			selector: siema,
			loop: true
		});
		instance.addArrows();
	}
} catch (err) {
	_didIteratorError = true;
	_iteratorError = err;
} finally {
	try {
		if (!_iteratorNormalCompletion && _iterator.return) {
			_iterator.return();
		}
	} finally {
		if (_didIteratorError) {
			throw _iteratorError;
		}
	}
}
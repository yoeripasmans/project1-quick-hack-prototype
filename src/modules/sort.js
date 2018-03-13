import render from './render';

const sort = {
	getInput: function(data) {
		let clicked = false;
		const chevronDown = document.querySelector(".sort-fa-chevron-down");
		const chevronUp = document.querySelector(".sort-fa-chevron-up");
		const sortButton = document.querySelector('.sort-button');

		sortButton.addEventListener('click', e => {
			if (clicked == false) {
				chevronDown.classList.remove("show");
				chevronUp.classList.add("show");
				this.onYear(data);
				clicked = true;
			} else {
				chevronDown.classList.add("show");
				chevronUp.classList.remove("show");
				this.reset(data);
				clicked = false;
			}
		});
	},

	onYear: function(data) {
		console.log('sorteer');
		const sortedData = data.sort(function(b, a) {
			var keyA = new Date(a.date.value),
				keyB = new Date(b.date.value);
			// Compare the 2 dates
			if (keyA < keyB) return -1;
			if (keyA > keyB) return 1;
			return 0;
		});

		render.images(sortedData);
	},
	reset: function(data) {
		console.log('reset');
		const sortedData = data.sort(function(a, b) {
			var keyA = new Date(a.date.value),
				keyB = new Date(b.date.value);
			// Compare the 2 dates
			if (keyA < keyB) return -1;
			if (keyA > keyB) return 1;
			return 0;
		});

		render.images(sortedData);
	}
};

export default sort;

import render from './render';

const filter = {
	getInput: function(data) {
		const searchForm = document.querySelector('.search');
		searchForm.addEventListener('keyup', e => this.filter(searchForm.value, data));
	},

	filter: function(value, data) {
		const filterData = data.filter(obj => {
			if (obj.date.value.includes(value)) {
				return true;
			} else {
				return false;
			}
			return filterData;
		});
		render.images(filterData);
	}
};

export default filter;

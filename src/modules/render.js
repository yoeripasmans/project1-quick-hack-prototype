import sections from './sections';
import gallery from './gallery';
import preview from './preview';
import transparency from './vendor/transparency.min.js';


const render = {

	detail: function(data) {
		const directives = {

			name: {
				text: function(params) {
					return this.buildingLabel.value;
				}
			},
			count: {
				text: function(params) {
					return this.count.value + " Afbeeldingen gevonden";
				}
			}

		};
		//Render detail section
		Transparency.render(document.querySelector('#detail header'), data, directives);
		//Toggle detail screen
		sections.toggle('detail');

	},
	images: function(data) {
		const directives = {
			img: {
				src: function(params) {
					return this.img.value;
				},

			},

		};
		Transparency.render(document.querySelector('.grid'), data, directives);
		gallery.init();
		preview.init();
	},

};

export default render;

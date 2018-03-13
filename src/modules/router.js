import api from './api.js';
import sections from './sections.js';
import routie from './vendor/routie.js';

const router = {
	//Set the router
	init: function() {

		routie({
			'': () => {
				routie('home');
			},
			'home': () => {
				sections.toggle('map');
			},
			'buildings/:name': (name) => {
				api.getBuildingDetail(name);
			}
		});
	},

};

export default router;

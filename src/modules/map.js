const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import sections from './sections.js';
import helpers from './helpers.js';
import api from './api.js';
import loader from './loader.js';
import error from './error.js';
import animation from './animation.js';

const map = {
	init: function(data) {
		loader.show();

		mapboxgl.accessToken = 'pk.eyJ1IjoieW9lcndlbGkiLCJhIjoiY2plZmViOHNlMWhhazMza3R5MmE5NG9jcyJ9.Bm8bYiLXnQ41Nv_Sio1xpA';

		const bounds = [
			[4.787780, 52.32277], // Southwest coordinates
			[5.009692, 52.422625] // Northeast coordinates
		];

		const map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/yoerweli/cjejq0mr0b9v72rp2ywvhnif4',
			center: [4.899431, 52.368189],
			zoom: 12.5,
			minZoom: 12.5,
			maxZoom: 15,
			maxBounds: bounds
		});
		// Add zoom and rotation controls to the map.
		map.addControl(new mapboxgl.NavigationControl());
		// Add geolocate control to the map.
		map.addControl(new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true
			},
			trackUserLocation: true

		}));

		//Format the data
		helpers.formatData(data);

		map.on('load', (e) => {
			loader.hide();

			if (map.loaded()) {

				//Add markers to the map
				data.forEach(d => {

					// create a circle for each building
					const el = document.createElement('a');
					el.className = 'marker';
					el.href = "#buildings/" + helpers.getSegment(d.building.value, 3);

					//Change the size of the cricles to the amount of collections
					el.style.width = helpers.circleSize(d) + "px";
					el.style.height = helpers.circleSize(d) + "px";
					el.style.backgroundColor = "hsl" + helpers.circleColor(d);
					el.style.opacity = 0;

					if(d.count.value > 500) {
					el.style.zIndex = 1;
					}
					if(d.count.value > 250) {
					el.style.zIndex = 1;
					}

					animation.fadeIn(el);

					//Adds tooltip
					const popup = new mapboxgl.Popup({
						closeButton: false,
						closeOnClick: false
					});


					el.addEventListener("mouseover", function() {
						popup.setLngLat(d.projected)
							.setHTML(d.buildingLabel.value)
							.addTo(map);
					});

					el.addEventListener("mouseout", function() {
						popup.remove();
					});


					// make a marker for each feature and add to the map
					new mapboxgl.Marker(el)
						.setLngLat(d.projected)
						.setPopup(popup)
						.addTo(map);
				});

				// turn off sourcedata listener if its no longer needed
				map.off('load');
			}
		});

		map.on("error", e => {
			error.show();
			loader.hide();
		});

	},

};
export default map;

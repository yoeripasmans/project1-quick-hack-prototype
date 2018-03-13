const wkt = require('terraformer-wkt-parser');
const helpers = {
	circleSize: function(d) {
		if (d.count.value > 0 && d.count.value < 50) {
			return 10;
		} else if (d.count.value > 50 && d.count.value < 100) {
			return 12;
		} else if (d.count.value > 100 && d.count.value < 250) {
			return 15;
		} else if (d.count.value > 250 && d.count.value < 500) {
			return 17;
		} else if (d.count.value > 500 && d.count.value < 750) {
			return 20;
		} else if (d.count.value > 750 && d.count.value < 1000) {
			return 30;
		}
	},

	circleColor: function(d) {
		if (d.count.value > 0 && d.count.value < 50) {
			return "(5, 74%, 38%)";
		} else if (d.count.value > 50 && d.count.value < 100) {
			return "(5, 74%, 40%)";
		} else if (d.count.value > 100 && d.count.value < 250) {
			return "(5, 74%, 42%)";
		} else if (d.count.value > 250 && d.count.value < 500) {
			return "(5, 74%, 45%)";
		} else if (d.count.value > 500 && d.count.value < 750) {
			return "(5, 74%, 47%)";
		} else if (d.count.value > 750 && d.count.value < 1000) {
			return "(5, 74%, 49%)";
		}
	},


	formatData: function(data) {
		//Format the data to get the right latitude and longitude
		data.forEach(d => {
			d.wkt = wkt.parse(d.wkt.value);
			if (d.wkt.type == "Point") {
				d.projected = [d.wkt.coordinates[0], d.wkt.coordinates[1]];
			} else {
				d.projected = [d.wkt.coordinates[0][0][0], d.wkt.coordinates[0][0][1]];
			}
		});
	},

	getSegment: function(url, index) {
		return url.replace(/^https?:\/\//, '').split('/')[index];
	}

};

export default helpers;

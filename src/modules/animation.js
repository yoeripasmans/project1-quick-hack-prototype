const animation = {
	fadeIn: function(el) {
		let opacity = 0;
		const id = setInterval(frame, 5);

		function frame() {
			if (opacity == 1) {
				clearInterval(id);
			} else {
				opacity++;
				el.style.opacity = opacity;
			}
		}
	}
};

export default animation;

const preview = {

	init: function(){
		const images = document.querySelectorAll('.gallery-img');
		for (var i = 0; i < images.length; i++) {
			images[i].addEventListener('click', this.open);
		}
		const closeButton = document.querySelector('.close-button');
		closeButton.addEventListener('click', this.close);

		const previewWrapper = document.querySelector('.preview');
		previewWrapper.addEventListener('click', this.close);
	},
	open: function(){
		const previewWrapper = document.querySelector('.preview');
		const previewImg = document.querySelector('.preview-img');
		previewImg.src = this.src;
		previewWrapper.classList.add("show");
		console.log(this.src);
	},
	close: function(){
		const previewWrapper = document.querySelector('.preview');
		previewWrapper.classList.remove("show");
	}
};

export default preview;

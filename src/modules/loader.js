const loader = {
	 element: document.querySelector('.loader'),
	 show: function(el){
		 this.element.classList.add("show");
	 },
	 hide: function(el){
		 this.element.classList.remove("show");
	 }

};

export default loader;

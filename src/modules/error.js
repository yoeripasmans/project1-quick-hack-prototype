const error = {
	 element: document.querySelector('.error'),
	 show: function(){
		 this.element.classList.add("show");
	 },
	 hide: function(el){
		 this.element.classList.remove("show");
	 }

};

export default error;

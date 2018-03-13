const toggle = {
	chevronDown: document.querySelector(".fa-chevron-down"),
	chevronUp: document.querySelector(".fa-chevron-up"),
	header: document.querySelector("body>header"),
	introText: document.querySelector(".intro"),
	init: function() {
		const _this = this;
		this.show();
		this.chevronUp.addEventListener("click", () => this.hide());
		this.chevronDown.addEventListener("click", () => this.show());

	},
	show: function() {
		this.chevronDown.classList.remove("show");
		this.chevronUp.classList.add("show");
		this.header.classList.remove("hidden");
		this.introText.classList.add("show");
	},
	hide: function() {
		this.chevronDown.classList.add("show");
		this.chevronUp.classList.remove("show");
		this.header.classList.add("hidden");
		this.introText.classList.remove("show");
	}
};

export default toggle;

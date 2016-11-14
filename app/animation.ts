export class Balloon {
	public balloon = document.createElement('img');
	public rand = Math.random();
	public bool = Math.round(Math.random());
	public x = Math.random() * window.innerWidth;
	public y = Math.random() * window.innerHeight;
	public balloonImg = 'http://www.pngpix.com/wp-content/uploads/2016/05/PNGPIX-COM-Purple-Balloon-PNG-image.png';


	// constructor() {
	// 	this.balloon = document.createElement('img');
	// 	this.rand = Math.random();
	// 	this.bool = Math.round(Math.random());
	// 	this.x = Math.random() * window.innerWidth;
	// 	this.y = Math.random() * window.innerHeight;

	// 	this.balloon.src = this.balloonImg;
	// 	this.balloon.className = 'balloon';
	// 	this.balloon.style.top = this.y + 'px';
	// 	this.balloon.style.left =  this.x + 'px';
	// 	this.balloon.style.width = (this.rand * 101) + 'px';
	// 	// this.balloon.style.zIndex = Math.round(this.rand * 100);
	// 	this.balloon.style.webkitFilter = 'hue-rotate(' + Math.random() * 360 + 'deg) blur(' + (1 - this.rand) * 5 + 'px) brightness(' + (this.rand * 100) + '%)';
	// 	this.balloon.style.filter = 'hue-rotate(' + Math.random() * 360 + 'deg) blur(' + (1 - this.rand) * 5 + 'px) brightness(' + (this.rand * 100) + '%)';
		
	// 	this.bool ? this.balloon.style.transform = 'rotate(' + Math.random() * 30 + 'deg)' : this.balloon.style.transform = 'rotate(' + (Math.random () * 30) * -1 + 'deg)';

	// 	document.body.appendChild(this.balloon);
	// 	this.float();
	// }
    
	// float () {
	// 	let _this = this;
	// 	setInterval(function () {
	// 		if (_this.y > 0 - parseInt(window.getComputedStyle(_this.balloon).height)) {
	// 			_this.y--;
	// 			_this.balloon.style.top = _this.y + 'px';
	// 		} else {
	// 			_this.y = window.innerHeight;
	// 			_this.balloon.style.top = '100vh';
	// 		}
	// 		}, (1 - this.rand) * 100);
	// 	};
	// };

	// for (let i = 0; i < window.innerWidth / 30; i++) {
	// 	new Balloon();
	// }

	// window.onresize = () => {
	// document.body.innerHTML = '';  

	// for (let i = 0; i < window.innerWidth / 30; i++) {
	// 	new Balloon();
	// }
};

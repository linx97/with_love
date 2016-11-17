import { Component, OnInit, ElementRef } from '@angular/core';
import { ListenService } from './listen.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'listen',
	template: `
		<div class="full-screen">

			<div *ngIf="this.listenService.card">
				<h1>{{this.listenService.card.title}}</h1>
			</div>
			<div class="play">
				<img src="../images/play.png" (click)="playAudio(); class = !class; this.stop = this.stop + 1;" [class]="addClass()">
			</div> 

			<p class="go-back" (click)="goBack()">back</p>
		</div>
	`,
	styles: [`
		.full-screen {
			position: absolute;
			width: 100%;
			height: 100%;
			background: linear-gradient(330deg, #605B7F 0%, #7E6086 50%, #5C667F 100%);
			opacity: 0.8;
			top: 0;
			left: 0;
			text-align: center;
			overflow: hidden;
			padding-left: 30px;
			padding-right: 30px;
		}
		.balloon {
			position: absolute;
		}	
		.play {
			margin:auto;
		}	
		h1 {
			font-family: 'Tornac Trial', sans-serif;
			font-size: 4em;
			color: white;
			text-shadow: 4px 2px 5px rgba(50, 50, 50, 1);
		}

		img {
			margin-top: 25px;
			width: 29%;
			z-index: 50;
			opacity: 0.9;
			transition: color 0.7s;
			overflow: visible;
		}
		img:hover {
			opacity: 1;
		}
		.clicked {
			animation: grow 1s linear 1;
		}
		p {
			color: #fff;
			position: absolute;
			right: 105px;
			top: 30px;
			font-size: 1.2em;
			opacity: 0.8;
			letter-spacing: 1;
		}
		p:hover {
			opacity: 1;
			cursor:pointer;
		}
		@keyframes grow {
			0% {
				width: 29%;
			}
			40% {
				width: 30%;
			}
			100% {
				width: 29%;
			}
		}
	`]
})
export class ListenComponent implements OnInit {
	private song;
	private messageArray;
	private class = false;
	private stop = 0;
	private audios = [];

	constructor(
		private listenService: ListenService, 
		private route: ActivatedRoute,
		private router: Router,
		private _elRef: ElementRef,
		private location: Location,
		) {}

	ngOnInit() {
		this.getCard();
		this.getMessages();
	}

	playAudio() {
		this.loopMessages();
		this.animation();
		if (this.stop === 1) {
			location.reload();
		}
	}

	getCard() {
		this.route.params.forEach((params: Params) => {
			let cardId = params['id'];
			this.listenService.getCard(cardId).subscribe();
		});	
	}

	getMessages() {
		this.route.params.forEach((params: Params) => {
			let cardId = params['id'];
			this.listenService.getMessages(cardId).subscribe();
		});	
	}

	addClass() {
		if (this.class) {
			return "clicked";
		} else {
			return "";
		}
	}


	loopMessages() {
		let song = new Audio();
		this.audios.push(song);

		if (this.listenService.card && this.listenService.card.song) {
			song.src = this.listenService.card.song;
			song.volume = this.listenService.card.songVolume;
			let bpm = song;
			song.id = "thisSong";
			song.load();
			song.loop = true;
			song.play();
		}

		if (this.listenService.card && this.listenService.messageSrcs) {
			let message = new Audio();
			this.audios.push(message);
			message.setAttribute('src', this.listenService.messageSrcs[0]);
			message.load();
			setTimeout(function() { message.play(); }, 4000);
			let i = 0;

			
			if (this.listenService.messageSrcs.length > 1) {
				message.addEventListener("ended", () => {
					console.log(message);
					let a = setTimeout(() => {					
						i++;
						console.log(i);
						if (i < this.listenService.messageSrcs.length) {
							message.setAttribute('src', this.listenService.messageSrcs[i]);
							message.load();
							message.play();
						} else {
							clearTimeout(a);
							let fadePoint = message.duration - 2; 
							setTimeout(() => { 
								let fadeAudio = setInterval(() => {
									if ((song.currentTime >= fadePoint) && (song.volume !== 0.0)) {
										let newVol = song.volume - 0.1;
										if (newVol < 0) {
											newVol = 0;
										}
										song.volume = newVol;
									}
									if (song.volume === 0.0) {
										clearInterval(fadeAudio);
									}
								}, 800);
							}, 2000);
	
						}
					}, 2000) ;
				});
			}

		}
	}

	animation() {
		class Balloon {
			private balloon = document.createElement('img');
			private rand = Math.random();
			private bool = Math.round(Math.random());
			private x = Math.random() * window.innerWidth;
			private y = Math.random() * window.innerHeight;
			private imageArray = ['../images/music1.png', '../images/music2.png', '../images/music3.png'];
			private balloonImg = this.randImage();


			randImage() {
				let i: number = Math.random();
				if (i < 0.33) {
					return this.balloonImg = this.imageArray[0];
				} else if (i < 0.66) {
					return this.balloonImg = this.imageArray[1];
				} else {
					return this.balloonImg = this.imageArray[2];
				}
			}

			constructor() {
				this.balloon = document.createElement('img');
				this.rand = Math.random();
				this.bool = Math.round(Math.random());
				this.x = Math.random() * window.innerWidth;
				this.y = Math.random() *  window.innerHeight + window.innerHeight;

				this.balloon.src = this.balloonImg;
				this.balloon.className = 'balloon';
				this.balloon.style.top = this.y + 'px';
				this.balloon.style.left =  this.x + 'px';
				this.balloon.style.width = (this.rand * 101) + 'px';
				this.balloon.style.position = 'absolute';
				this.balloon.style.zIndex = Math.round(this.rand * 100).toString();
				this.balloon.style.webkitFilter = 'blur(' + (1 - this.rand) * 5 + 'px) brightness(' + (this.rand * 100) + '%)';
				this.balloon.style.filter = 'blur(' + (1 - this.rand) * 5 + 'px) brightness(' + (this.rand * 100) + '%)';
				
				this.bool ? this.balloon.style.transform = 'rotate(' + Math.random() * 10 + 'deg)' : this.balloon.style.transform = 'rotate(' + (Math.random () * 30) * -1 + 'deg)';

				document.body.appendChild(this.balloon);
				this.float();
			}
		    
			float () {
				let _this = this;
				let floating = setInterval(function () {
					if (_this.y > 0 - parseInt(window.getComputedStyle(_this.balloon).height, 10)) {
						_this.y -= 0.3;
						_this.balloon.style.top = _this.y + 'px';
					} else {
						_this.x = Math.random() * window.innerWidth;
						_this.y = window.innerHeight;
						_this.balloon.style.top = '100vh';
					}
				}, (1 - this.rand) * 100);
			};
		};

		for (let i = 0; i < window.innerWidth / 60; i++) {
			new Balloon();
		}
	};

	ngOnDestroy() {
		let balloons: any = document.getElementsByClassName("balloon");
		console.log(balloons);
		while (balloons[0]) {
			balloons[0].parentNode.removeChild(balloons[0]);
		}
		for (let i of this.audios) {
			i.pause();
		}
	}

	goBack() {
		this.location.back();
	}
}

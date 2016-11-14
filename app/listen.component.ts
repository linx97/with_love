import { Component } from '@angular/core';
import { ListenService } from './listen.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'listen',
	template: `
		<div class="full-screen">

			<div *ngIf="this.listenService.card">
				<h1>{{this.listenService.card.title}}</h1>
			</div>

			<img src="../images/play.png" (click)="playAudio()"> 
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
		}
		.balloon {
			position: absolute;
		}		
		h1 {
			font-family: 'Tornac Trial', sans-serif;
			font-size: 4em;
			color: white;
		}
		img {
			margin-top: 25px;
			width: 29%;
		}
	`]
})
export class ListenComponent {
	private song;
	private messageArray;

	constructor(
		private listenService: ListenService, 
		private route: ActivatedRoute,
		private router: Router,
		) {}

	ngOnInit() {
		this.getCard();
		this.getMessages();
	}

	playAudio() {
		this.playBackgroundMusic();
		this.loopMessages();
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

	playBackgroundMusic() {
		
	}



	loopMessages() {
		let song = new Audio();

		if (this.listenService.card && this.listenService.card.song) {
			song.src = this.listenService.card.song;
			song.volume = this.listenService.card.songVolume;
			song.load();
			song.play();
		}

		if (this.listenService.card && this.listenService.messageSrcs) {
			let message = new Audio();
			message.setAttribute('src', this.listenService.messageSrcs[0]);
			message.load();
			setTimeout(function() { message.play(); }, 2000);
			let i = 0;

			
		if (this.listenService.messageSrcs.length > 1) {
				message.addEventListener("ended", () => {
					console.log(message);
					let a = setInterval(() => {					
				i++;
				console.log(i);
				if (i < this.listenService.messageSrcs.length) {
					message.setAttribute('src', this.listenService.messageSrcs[i]);
					message.load();
					message.play();
				} else {
					clearInterval(a);
					setTimeout(function() { song.pause(); }, 2000);
				}
					}, Math.floor((message.duration) * 1000) + 1000) ;
				});
			}

		}
	}

}

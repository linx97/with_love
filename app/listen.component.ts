import { Component } from '@angular/core';
import { ListenService } from './listen.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'listen',
	template: `
		<h1>Play Your Greeting!</h1>

		<img src="../images/play.svg" (click)="playMusic(audioEl)"> 
		
		<div *ngIf="this.listenService.card && this.listenService.card.song">
			<audio #audioEl controls [src]="this.listenService.card.song" [volume]="this.listenService.card.songVolume"></audio>
		</div>

		<div *ngIf="this.listenService.card && this.listenService.messageArray">
			<div *ngFor="let i of this.listenService.messageArray">
				<audio controls [src]="i"></audio>
			</div>
		</div>

		<audio id="audio1" controls src="http://localhost:8000/5824da125114f11c68c610da"></audio>
		<audio id="audio2" controls src="http://localhost:8000/58250fbfa0b29502a137c18b"></audio>
		<audio id="audio2" controls src="http://localhost:8000/5825e3c67538be0a9d60885a"></audio>
	`,
	styles: [`
		img {
			width: 30%;
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

	}

	playMusic(el: HTMLAudioElement) {
		el.play();
	}

	getCard() {
		this.route.params.forEach((params: Params) => {
			let cardId = params['id'];
			this.listenService.getCard(cardId).subscribe();
		});	
	}

	loopMessages() {

	}
}

import { Component } from '@angular/core';
import { ListenService } from './listen.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'listen',
	template: `
		<h1>Play Your Greeting!</h1>

		<img src="../images/play.svg" (click)="playMusic(audioEl)"> 
		
		<div *ngIf="this.listenService.card && this.listenService.card.song">
			<audio #audioEl controls [src]="this.listenService.card.song"></audio>
		</div>
	`,
	styles: [`
		img {
			width: 30%;
		}
	`]
})
export class ListenComponent {
	private song;

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
			this.listenService.getCard(cardId).subscribe(

			);
		});	
	}
}

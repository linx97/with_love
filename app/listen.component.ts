import { Component } from '@angular/core';
import { ListenService } from './listen.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'listen',
	template: `
		<h1>Play Your Greeting!</h1>

		<img src="../images/play.svg"> 
		<audio controls src="../music/06 What Is The Light_.mp3">
	`,
	styles: [`
			img {
				width: 30%;
			}
	`]
})
export class ListenComponent {

	constructor(
		private listenService: ListenService, 
		private route: ActivatedRoute,
		private router: Router
		) {}

	playMusic(event) {
		event.play();
	}
}

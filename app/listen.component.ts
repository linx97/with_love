import { Component } from '@angular/core';
import { ListenService } from './listen.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'listen',
	template: `
		<h1>Play Your Greeting!</h1>
	`
})
export class ListenComponent {

	constructor(
		private listenService: ListenService, 
		private route: ActivatedRoute,
		private router: Router
		) {}
}
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'my-app',
	template: `
		<nav>
			<a routerLink="/cards" routerLinkActive="active">Home</a>
		</nav>

		<h1>Homepage</h1>
		
		<router-outlet></router-outlet>
		
	`
})
export class AppComponent implements OnInit {
	ngOnInit(): void {
	}
}

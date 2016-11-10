import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'my-app',
	template: `
		<div class="sidebar">
			<img src="../images/white-logo3.png">
			<p>Give some love! Easily create <br>and send personalized audio cards for any occasion.</p>
			<nav>
				<a routerLink="/cards" routerLinkActive="active">home</a>
				<a routerLink="#" routerLinkActive="active">about</a>
				<a routerLink="#" routerLinkActive="active">contact</a>
				
			</nav>
			<hr>
		</div>
		
		<div class="wrapper">
			<router-outlet></router-outlet>
		</div>
	`,
	styles: [`
		.sidebar {
			background-image: url("../images/celebrate1.png");
			background-size: cover;
			float: left;
			padding: 10px;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			height: 100%;
			width: 31%;
			clear: both;
			box-shadow: 4px 0 7px -2px #888;
		}
		img {
			margin-top: 180px;
			width: 68%;
			margin-left:16%;
		}
		p {
			font-size: 1.35em;
			padding: 0px 20px;
			color: white;
			font-family: 'Tornac Trial', sans-serif;
			line-height: 1.2;
			text-align: center;
		}
		nav {
			margin-left: -10px;
			width: 100%;
			position: absolute;
			bottom: 6%;
			font-size: 1.2em;
			text-decoration: none;
			text-align: center;
		}
		nav a {
			opacity: 0.8;
			font-family: 'Catamaran', sans-serif;
			text-decoration: none;
			text-align: center;
			color: white;
			padding: 0 20px;
		}
		nav a:hover {
			opacity: 01;
		}
		hr {
			color: white;
			position: absolute;
			bottom: 5%;
			width: 65%;
			margin-left: 14%;
		}
		.wrapper {
			margin-left: 43%;
			margin-right: 6%;
			padding: 20px;
		}

		@media (max-width: 690px) {
			.sidebar {
				display: none;
			}
			.wrapper {
				margin: 0;
			}
		}
	`]
})
export class AppComponent implements OnInit {
	ngOnInit(): void {
	}
}

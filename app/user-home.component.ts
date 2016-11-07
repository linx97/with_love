import { Component } from '@angular/core';
import { UserHomeService } from './user-home.service';
import { Router } from '@angular/router';

@Component({
	selector: 'user-home',
	template: `
	<div>
		<div class="holder">
			<h2 *ngIf="finished && !this.userHomeService.cards">You haven't created any cards.</h2>

			<div class="card-div" 
			*ngFor="let c of this.userHomeService.cards">
				<h3 (click)="onSelect(c)">{{c.title}}</h3>
			</div>
		</div>
 
		<div class="create">
			<input type="text" class="new-card-input" placeholder="title" [(ngModel)]="newCard.title" (keyup)="onKeyUp($event)">
			<button (click)="createNewCard()">Create New Card!</button>
		</div>
	</div>
	`,
	styles: [`
		h1 {
			padding-left: 30px;
			font-size: 2.3em;
			font-weight: bold;
		}
		.holder {
			margin: 45px 0 25px 0;
			padding: 5px 25px;
			height: 450px;
			overflow: scroll;
			border: 20px solid transparent;
			border-radius: 7px;
		}
		.card-div {
			width: 87%;
			height: 430px;
			background-image: url("../images/card.jpg");
			background-size: cover;
			margin-bottom: 15px;
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 38px;
			padding-right: 10px
			margin-top: 20px;
		}
		.card-div:hover {
			cursor:pointer;
		}
		.card-div h3 {
			font-size: 3.7em;
			background: linear-gradient(330deg, #8F9EC6 0%, #AF86BB 50%, #9A91CB 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			font-family: 'Tornac Trial', sans-serif;
			width: 93%;
			text-align: center;
			text-shadow: 3px 2px -9px rgba(0, 0, 0, .3);
		}
		.create {
			position: absolute;
			right: 12%;
			margin-left: 30px;
		}
		button {
			height: 46px;
			width: 319px;
			border-radius: 5px;
			text-align: center;
			margin: 8px;
			font: 20px Catamaran;
			color: white;
			background-color: #6f8fbf;
			box-shadow: none;
			border: none;
			margin-right: -30px;
		}
		button:hover {
			color: #6f8fbf;
			background-color: white;
			border: 2px solid #6f8fbf;
		}
		input {
			outline: none;
			height: 46px;
			width: 319px;
			margin: 8px;
			border-radius: 5px;
			padding-left: 30px;
			border-color: #C4C4C4;
			font: 20px Catamaran;
			border-style: solid;
		}
	`]
})
export class UserHomeComponent {
	private newCard = {
		title: '',
		contributors: []
	};

	private finished: boolean = false;

	constructor(private userHomeService: UserHomeService, private router: Router) {}

	onKeyUp(evt) {
		if (evt.keyCode === 13) {
			this.createNewCard();
		}
	}

	ngOnInit(): void {
		this.userHomeService.getCards().subscribe();
		this.finished = true;
		console.log(!this.userHomeService.cards);
	}

	createNewCard() {
		this.userHomeService.createNewCard(this.newCard).subscribe(() => {
			console.log(this.newCard);
			this.userHomeService.getCards().subscribe();
			this.newCard.title = "";
			this.finished = true;
			console.log(this.finished);
		}) ;	
	}

	onSelect(card): void {
		this.router.navigate(['/cards', card._id]);
	}
}

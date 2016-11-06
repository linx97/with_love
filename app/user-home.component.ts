import { Component } from '@angular/core';
import { UserHomeService } from './user-home.service';
import { Router } from '@angular/router';

@Component({
	selector: 'user-home',
	template: `
	<div>
		<h1>Your saved cards:</h1>

		<div class="holder">
			
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
			margin: -20px 0 40px 0;
			padding: 5px 45px;
			height: 370px;
			overflow: scroll;
			border: 20px solid transparent;
			border-radius: 7px;
		}
		.card-div {
			width: 95%;
			height: 355px;
			background-image: url("../images/card.jpg");
			background-size: cover;
			margin-bottom: 15px;
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		.card-div h3 {
			font-size: 3.7em;
			background: linear-gradient(330deg, #8F9EC6 0%, #AF86BB 50%, #9A91CB 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			font-family: 'Tornac Trial', sans-serif;
			width: 100%;
			text-align: center;
			text-shadow: 3px 2px -9px rgba(0, 0, 0, .3);
		}
		.create {
			position: absolute;
			right: 12%;
		}
		button {
			margin-left: 20px;
		}
	`]
})
export class UserHomeComponent {
	private newCard = {
		title: '',
		id: '',
		contributors: []
	};


	constructor(private userHomeService: UserHomeService, private router: Router) {}

	onKeyUp(evt) {
		if (evt.keyCode === 13) {
			this.createNewCard();
		}
	}

	ngOnInit(): void {
		this.userHomeService.getCards().subscribe();
	}

	createNewCard() {
		this.userHomeService.createNewCard(this.newCard).subscribe(() => {
			console.log(this.newCard);
			this.userHomeService.getCards().subscribe();
			this.newCard.title = "";
		}) ;	
	}

	onSelect(card): void {
		this.router.navigate(['/cards', card.id]);
	}
}

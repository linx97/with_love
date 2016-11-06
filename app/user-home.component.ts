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
			<button (click)="createNewCard()">Create!</button>
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
			border: 4px solid #EAEAEA;
			border-radius: 5px;
			margin: -20px 0 50px 0;
			padding-left: 30px;
			height: 400px;
			overflow: scroll;
			box-shadow: inset 0 0 10px #EAEAEA;

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

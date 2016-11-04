import { Component } from '@angular/core';
import { CardService } from './card.service';
import { Router } from '@angular/router';

@Component({
	selector: 'card-list',
	template: `
		<div>
			Your saved cards:
			<div class="card-div" *ngFor="let c of cards">
				<h4>{{c.title}}</h4>
				<button class="delete-card" (click)="deleteCard(c)">Delete</button>
			</div>
		</div>
 
		<input type="text" class="new-card-input" placeholder="title" [(ngModel)]="newCard.title" (keyup)="onKeyUp($event)">
		<button class="create-new-card" (click)="createNewCard()">Create!</button>
	`
})
export class CardComponent {
	private newCard = {
		title: '',
		id: '',
		contributors: []
	};
	public cards: Object[] = [];

	constructor(private cardService: CardService, private router: Router) {}

	onKeyUp(evt) {
		if (evt.keyCode === 13) {
			this.createNewCard();
		}
	}

	ngOnInit(): void {
		this.cardService.getCards().subscribe((cards) => {
			this.cards = cards;
		});
	}

	createNewCard() {
		this.cardService.createNewCard(this.newCard);
		this.newCard.title = "";
		this.cardService.getCards().subscribe((cards) => {
			this.cards = cards;
		});
	}

	deleteCard(card) {
		this.cardService.deleteCard(card);
		this.cardService.getCards().subscribe((cards) => {
			this.cards = cards;
		});
	}

	

	// onSelect(card: Object): void {
	// 	this.router.navigate(['/cards', card.id]);
	// }
}

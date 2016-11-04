import { Component } from '@angular/core';
import { UserHomeService } from './user-home.service';
import { Router } from '@angular/router';

@Component({
	selector: 'user-home',
	template: `
		<div>
			Your saved cards:
			<div class="card-div" 
			*ngFor="let c of this.userHomeService.cards">
				<h4 (click)="onSelect(c)">{{c.title}}</h4>
			</div>
		</div>
 
		<input type="text" class="new-card-input" placeholder="title" [(ngModel)]="newCard.title" (keyup)="onKeyUp($event)">
		<button class="create-new-card" (click)="createNewCard()">Create!</button>
	`
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

import { Component } from '@angular/core';
import { CardDetailService } from './card-detail.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UserHomeService } from './user-home.service';

@Component({
	selector: 'card-detail',
	template: `
	<div *ngIf="card">
		<h2>{{card.title}}</h2>
		<h3>Add People</h3>

		<div *ngFor="let p of card.contributors">
			<h4 (click)="onSelect(p)">{{p.name}}</h4>
			<button (click)="removeContributor(p)">Remove</button>
		</div>

		<input type="text" class="new-contributor" placeholder="name" [(ngModel)]="newContributor.name" (keyup)="onKeyUp($event)">
		<button class="add-new contributor" (click)="addNewContributor()">Add to Card</button>

		<button class="delete-card" (click)="deleteCard(card)">Delete</button>
		<button (click)="goBack()">Back</button>
	</div>
	`
})
export class CardDetailComponent {
	private card: Object;
	
	private newContributor = {
		name: '',
		id: '',
		message: ''
	};

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private cardDetailService: CardDetailService,
		private userHomeService: UserHomeService,
		private location: Location
	) {}

	onKeyUp(evt) {
		if (evt.keyCode === 13) {
			this.addNewContributor();
		}
	}

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let cardId = parseInt(params['id'], 10);
			this.cardDetailService.getCard(cardId).subscribe((card) => {
				this.card = card;
			});
		});
	}

	deleteCard(card) {
		this.userHomeService.deleteCard(card);
		this.router.navigate(['/cards']);	
	}

	goBack() {
		this.location.back();
	}

	addNewContributor() {
		this.route.params.forEach((params: Params) => {
			let cardId = parseInt(params['id'], 10);
			this.cardDetailService.addNewContributor(this.newContributor, cardId).subscribe(() => {
				console.log(this.newContributor);
				// this.cardDetailService.getContributors().subscribe();
				this.newContributor.name = "";
				this.cardDetailService.getCard(cardId).subscribe((card) => {
					this.card = card;
				});
			}) ;
		});
	}

	onSelect(contributor): void {
		console.log(contributor.id);
		this.router.navigate(['/record', contributor.id]);
	}

	removeContributor(contributor) {
		this.route.params.forEach((params: Params) => {
			let cardId = parseInt(params['id'], 10);
			this.cardDetailService.removeContributor(contributor, cardId).subscribe((card) => {
				this.card = card;
			});
		});
		
	}
}

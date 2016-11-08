import { Component } from '@angular/core';
import { CardDetailService } from './card-detail.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UserHomeService } from './user-home.service';

@Component({
	selector: 'card-detail',
	template: `
	<div *ngIf="this.cardDetailService.card">
		<h2>{{this.cardDetailService.card.title}}</h2>
	
		<div class="holder">
			<div *ngFor="let p of this.cardDetailService.card.contributors">
				<h4 (click)="onSelect(p)">{{p.name}}</h4>
				<img class="trash" src="../images/trash.svg" (click)="removeContributor(p)">
			</div>
		</div>

		<input type="text" class="new-contributor" placeholder="name" [(ngModel)]="newContributor.name" (keyup)="onKeyUp($event)">
		<button class="add-new contributor" (click)="addNewContributor()">Add to Card</button>

		<button class="delete-card" (click)="deleteCard(card)">Delete</button>
		<button class="listen" (click)="goListen()">Listen!</button>
		<button (click)="goBack()">Back</button>
	</div>
	`,
	styles: [`
		.wrapper {
			margin-left: 40px;
		}
		h2 {
			margin: 40px 0 20px 37px;
			font-size: 3em;
		}
		.holder {
			height: 370px;
			width: 88%;
			border: 3px solid #CCCCCC;
			box-shadow: inset 0 0 10px #BFBFBF;
			margin-bottom: 20px;
			border-radius: 7px;
			overflow: scroll;
			padding: 15px 0;
		}
		.holder>div {
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		.holder>div:hover {
			cursor:pointer;
		}
		h4 {
			display: inline-block;
			margin: 5px 0 5px 30px;
			font-size: 1.4em;
		}
		.listen {
			margin: auto;
		}
		.trash {
			width: 25px;
			position: absolute;
			right: 30px;

		}
	`]
})
export class CardDetailComponent {	
	private newContributor = {
		name: '',
		message: {}
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
			let cardId = params['id'];
			this.cardDetailService.getCard(cardId).subscribe();
		});
	}

	deleteCard(card) {
		this.userHomeService.deleteCard(card).subscribe();
		this.router.navigate(['/cards']);	
	}

	public goBack() {
		this.location.back();
	}

	addNewContributor() {
		this.route.params.forEach((params: Params) => {
			let cardId = params['id'];
			console.log(cardId);
			this.cardDetailService.addNewContributor(this.newContributor, cardId).subscribe(() => {
				// this.cardDetailService.getContributors().subscribe();
				this.newContributor.name = "";
				this.cardDetailService.getCard(cardId).subscribe();
			}) ;
		});
	}

	onSelect(contributor): void {
		this.router.navigate(['/record', contributor._id]);
	}

	removeContributor(contributor) {
		this.route.params.forEach((params: Params) => {
			let cardId = params['id'];
			this.cardDetailService.removeContributor(contributor, cardId).subscribe();
		});	
	}

	goListen() {
		this.router.navigate(['/listen', this.cardDetailService.card._id]);
	}
}

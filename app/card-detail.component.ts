import { Component } from '@angular/core';
import { CardDetailService } from './card-detail.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UserHomeService } from './user-home.service';
import { ListenService } from './listen.service';

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

		<div class="buttons">
			<input type="text" class="new-contributor" placeholder="name" [(ngModel)]="newContributor.name" (keyup)="onKeyUp($event)">
			<button class="add-new contributor" (click)="addNewContributor()">add person</button>
			<div>
				Background Music: 
				<select (change)="setSong($event.target.value)">
					<option *ngFor="let song of songs" [value]="song">{{song}}</option>
				</select>
				Volume:
				<input id="slider" type="range" min="0" max="1" step="10" (change)="songVolume" />
			</div>
			<button (click)="goBack()">go back</button>
			<button class="delete-card" (click)="deleteCard(card)">delete card</button>
		</div>
		
		<h3>listen!</h3>
		<button class="listen" (click)="goListen()"></button>
	</div>
	`,
	styles: [`
		.wrapper {
			margin-left: 40px;
		}
		h2 {
			margin: 40px 0 20px 0;
			font-size: 2.7em;
		}
		.holder {
			height: 250px;
			width: 88%;
			border: 3px solid #CCCCCC;
			box-shadow: inset 0 0 10px #BFBFBF;
			margin-bottom: 25px;
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
		.buttons {
			margin-right: 80px;
			font-size: 1.2em;
		}
		.buttons button {
			margin-left: 0;
			margin-bottom: 25px;
			margin-top: 15px;
		}
		.buttons input {
			margin-left: 0;
			width: 260px;
		}
		select {
			margin: 10px 15px 15px 15px;
			width: 170px;
			font: 14px Catamaran;
			height: 36px;
		}
		.listen {
			position: absolute;
			opacity: 0.9;
			bottom: -220px;
			right: -120px;
			transform: rotate(48deg);
			height: 450px;
			width: 300px;
			font-weight: bold;
			font-size: 1.1em;
			background: linear-gradient(330deg, #8897BD 0%, #9D77A8 50%, #9188BF 100%);
		}
		.listen:hover {
			border: none;
			opacity: 1;
		}
		h3 {
			position: absolute;
			color: white;
			right: 50px;
			bottom: 37px;
			z-index: 10;
			letter-spacing: 2;
			font-size: 1.3em;
		}
		.trash {
			width: 25px;
			position: absolute;
			right: 30px;
		}
		#slider {
			width: 100px;
			margin: 15px 0 15px 15px;
		}
	`]
})
export class CardDetailComponent {	
	private newContributor = {
		name: '',
		message: {}
	};
	public song;
	private songs = ["none", "daisies", "memories", "slowmotion"];
	private songVolume;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private cardDetailService: CardDetailService,
		private userHomeService: UserHomeService,
		private location: Location,
		private listenService: ListenService
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

	setSong(song) {
		this.route.params.forEach((params: Params) => {
			let cardId = params['id'];
			this.cardDetailService.setSong(song, cardId).subscribe();
		});	
	}

	goListen() {
		this.router.navigate(['/listen', this.cardDetailService.card._id]);
	}
}

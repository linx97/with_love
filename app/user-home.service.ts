import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class UserHomeService {
	public cards: Object[];

	constructor(private apiService: ApiService) {
		// this.getPeople();
	}

	createNewCard(newCard: Object) {
		return this.apiService.postObs("/api/new-card", {
			card: newCard
		});
	}

	getCards() {
		return this.apiService.getObs('/api/get-cards').do((cards) => {
			this.cards = cards;
		});
	}	

	deleteCard(card: Object) {
		this.apiService.postObs("/api/delete-card", {
			card: card
		}).do((cards) => {
			this.cards = cards;
		});
	}
}

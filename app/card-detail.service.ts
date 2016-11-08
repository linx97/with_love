import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Card } from './card';


@Injectable()
export class CardDetailService {
	public contributors: string[];
	public card: Card;

	constructor(private apiService: ApiService) {}

	getCard(cardId) {
		return this.apiService.getObs('/api/get-card/' + cardId).do((card) => {
			this.card = card;
		});
	}

	addNewContributor(newContributor, cardId) {
		return this.apiService.postObs("/api/add-contributor/" + cardId, {
			newContributor: newContributor
		}).do((res) => {
			this.getCard(cardId).subscribe();
		});
	}

	removeContributor(contributor, cardId) {
		return this.apiService.postObs("/api/remove-contributor/" + cardId, {
			contributor: contributor
		}).do((res) => {
			this.getCard(cardId).subscribe();
		});
	}
	
}

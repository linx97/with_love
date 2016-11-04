import { Injectable } from '@angular/core';
import { ApiService } from './api.service';



@Injectable()
export class CardDetailService {
	public contributors: string[];
	public card: Object;

	constructor(private apiService: ApiService) {}

	getCard(cardId) {
		return this.apiService.getObs('/api/get-card/' + cardId).do((card) => {
			this.card = card;
		});
	}

	addNewContributor(newContributor, cardId) {
		return this.apiService.postObs("/api/add-contributor/" + cardId, {
			newContributor: newContributor
		});
	}

	removeContributor(contributor, cardId) {
		return this.apiService.postObs("/api/remove-contributor/" + cardId, contributor).do((card) => {
			this.card = card;
		});
	}
}

import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class ContributorService {
	public contributor;
	public message = false;

	constructor(private apiService: ApiService) {}

	addMessage(contributorId, cardId): any {
		return this.apiService.postObs("/api/add-message", {
			contributorId: contributorId,
			cardId: cardId
		}).do(() => {
			this.contributor.message = true;
		});
	}

	getName(contributorId, cardId) {
		return this.apiService.postObs('/api/get-name/' + contributorId, {cardId: cardId}).do((contributor) => {
			this.contributor = contributor;
		});
	}
}

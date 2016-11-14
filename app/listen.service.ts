import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Card } from './card';

@Injectable()
export class ListenService {
	public card: Card;
	public messageSrcs = [];
	
	constructor(private apiService: ApiService) {}

	getCard(cardId) {
		return this.apiService.getObs('/api/get-card/' + cardId).do((card) => {
			this.card = card;
		});
	}

	getMessages(cardId) {
		return this.apiService.getObs('/api/get-messages/' + cardId).do((messages) => {
			this.messageSrcs = messages;
		});
	}
}

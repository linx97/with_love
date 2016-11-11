import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Card } from './card';

@Injectable()
export class ListenService {
	public card: Card;
	public messageArray = [];
	
	constructor(private apiService: ApiService) {}

	getCard(cardId) {
		return this.apiService.getObs('/api/get-card/' + cardId).do((card) => {
			this.card = card;
			for (let c of this.card.contributors) {
				console.log(c);
				// if (c.message) {
				// 	let message = "http://localhost:8000/" + c._id + "\"";
				// 	this.messageArray.push(c._id);
				// 	console.log(this.messageArray);
				// }
			}
		});
	}
}

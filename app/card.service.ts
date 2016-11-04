import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class CardService {
	public cards: Object[];

	constructor(private apiService: ApiService) {
		// this.getPeople();
	}

	createNewCard(newCard: Object) {
		this.apiService.postObs("/api/new-card", {
			card: newCard
		}).subscribe();
	}

	getCards() {
		return this.apiService.getObs('/api/get-cards');
	}

	deleteCard(card: Object) {
		console.log(card);
		this.apiService.postObs("/api/delete-card", {
			card: card
		}).subscribe();
	}
	// public addNewPerson(person: string[]) {
	// 	this.apiService.postObs("/api", {
	// 		person: person
	// 	}).subscribe();
	// 	this.people.push(person);
	// }	
}

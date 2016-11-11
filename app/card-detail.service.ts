import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Card } from './card';


@Injectable()
export class CardDetailService {
	public contributors: string[];
	public card: Card;
	public cardId;
	public songFile;

	constructor(private apiService: ApiService) {}

	getCard(cardId) {
		return this.apiService.getObs('/api/get-card/' + cardId).do((card) => {
			this.card = card;
			this.cardId = this.card._id;
		});
	}

	addNewContributor(newContributor, cardId) {
		return this.apiService.postObs("/api/add-contributor/" + cardId, {
			newContributor: newContributor
		}).do((res) => {
			this.getCard(cardId).subscribe();
		});
	}

	setSong(song, cardId) {
		if (song === "none" || song === 'undefined') {
				this.songFile = false;
			} else {
				this.songFile = "../music/" +  song + ".mp3";
			}
		return this.apiService.postObs("/api/set-song/" + cardId, {
			song: this.songFile
		}).do((card) => {
			this.card.song = this.songFile;
		});
	}

	setVolume(songVolume, cardId) {
		return this.apiService.postObs("/api/set-volume/" + cardId, {
			songVolume: songVolume
		}).do((card) => {
			this.card = card;
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

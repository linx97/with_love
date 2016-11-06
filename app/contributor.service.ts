import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class ContributorService {
	constructor(private apiService: ApiService) {}

	addRecording(chunks, cardId): any {
		return this.apiService.postObs("/api/add-recording/" + cardId, {
			recording: chunks
		});
	}
}

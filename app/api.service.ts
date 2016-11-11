import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {
	private url: string = "http://localhost:8000";

	private postHeaders: Headers = new Headers({
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	});

	private getHeaders: Headers = new Headers({
		'Accept': 'application/json'
	});

	constructor(private http: Http) { }


	private getJSON(response: Response) {
		return response.json();
	}

	private checkForError(response: Response) {
		if (response.status >= 200 && response.status < 300) {
			return response;
		} else {
			let error = new Error(response.statusText);
			error['response'] = response;
			throw error;
		}
	}

	getObs(path: string): Observable<any> {
		return this.http.get(
			this.url + path,
			{headers: this.getHeaders}
		)
		.map(this.checkForError)
		.catch((err) => Observable.throw(err))
		.map(this.getJSON);
	}

	postObs(path: string, data: any): Observable<any> {
		return this.http.post(
			this.url + path,
			data,
			{headers: this.getHeaders}
		)
		.map(this.checkForError)
		.catch((err) => Observable.throw(err))
		.map(this.getJSON);
	}
}

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'music-selector',
	template: `
		<select (change)="select.emit($event.target.value)" [(ngModel)]="selectedValue">
			<option *ngFor="let song of songs" [ngValue]="song">{{song}}</option>
		</select>
	`
})
export class MusicSelector {
	@Output() select = new EventEmitter;
	private songs = ["none", "daisies", "memories", "slowmotion"];
	public selectedValue;


	ngOnInit() {
		this.select.emit(this.songs[0]);
		console.log(this.selectedValue);
	}

}

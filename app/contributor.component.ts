import { Component } from '@angular/core';
import { ContributorService } from './contributor.service';
import { CardDetailComponent } from './card-detail.component';
import { Location } from '@angular/common';
declare let navigator: any;
declare let MediaRecorder: any;


@Component({
	selector: 'contributor',
	template: `
		<h1>Record Message</h1>

		<button (click)='requestStream()'>Request Stream</button>

		<button (click)='start()'>Start</button>
		<button (click)='stop()'>Stop</button>
		<button (click)='play()'>Play</button>

		<a>{{hf}}</a>

		<button class="go-back" (click)="goBack()">Done</button>
		
	`
})
export class ContributorComponent {
	private chunks: any[] = [];
	private recorder;
	private audio;
	private counter = 1;

	constructor(
		private contributorService: ContributorService,
		private location: Location
	) {}

	requestStream() {
		let audio = {
			tag: 'audio',
			type: 'audio/ogg',
			ext: '.ogg',
			gUM: {audio: true}
		};
		navigator.mediaDevices.getUserMedia(audio.gUM).then(stream => {
		this.recorder =  new MediaRecorder(stream);
		this.recorder.ondataavailable = (evt) => {
			this.chunks.push(evt.data);
			if (this.recorder.state === 'inactive') {
				this.makeLink();
				console.log("done recording?");
			}
			this.chunks = [];
		};
	}).catch((err) => {
		console.log(err);
	});
	}

	start() {
		this.chunks = [];
		this.recorder.start();
	}

	stop() {
		this.recorder.stop();
		console.log(this.chunks);
	}

	makeLink() {
		let blob = new Blob(this.chunks, {type: this.audio.type })
		, url = URL.createObjectURL(blob)
		, mt = document.createElement(this.audio.tag)
		, hf = document.createElement('a')
		;
		
		hf.download = `${this.counter++}${this.audio.ext}`;
		hf.innerHTML = `donwload ${hf.download}`;
	}

	goBack() {
		this.location.back();
	}
}

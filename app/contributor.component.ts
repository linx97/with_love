import { Component } from '@angular/core';
import { ContributorService } from './contributor.service';
import { CardDetailService } from './card-detail.service';
import { CardDetailComponent } from './card-detail.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
declare let navigator: any;
declare let MediaRecorder: any;
declare let BinaryClient: any;

@Component({
	selector: 'contributor',
	template: `
		<h1>Record Message</h1>

		<div *ngIf="this.contributorService.contributor">
			<h2>{{this.contributorService.contributor.name}}</h2>
		</div>
		
		<div class="buttons">
			<button (click)='start()'>Start</button>
			<button (click)='stop()'>Stop</button>
			<button (click)='play()'>Play</button>
		</div>

		<div class="back">
			<button class="go-back" (click)="goBack()">Done</button>
		</div>
	`,
	styles: [`
		h1 {
			margin-top: 100px;
		}
		.buttons {
			margin-top: 140px;
		}
		.go-back {
			margin: 150px auto 0 auto;
		}
		.back {
			text-align: center;
		}
	`]
})
export class ContributorComponent {
	private chunks: any[] = [];
	private recorder;
	private audio;
	private counter = 1;
	private Stream;
	private recording = false;
	private contributorId;
	private link;
	private cardId;
	private canPlay = false;

	constructor(
		private contributorService: ContributorService,
		private cardDetailService: CardDetailService,
		private location: Location,
		private route: ActivatedRoute,
		private router: Router,
		private window: Window
	) {}

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			this.contributorId = params['id'];
			this.cardId = params['cardid'];
			this.contributorService.getName(this.contributorId, this.cardId).subscribe();
			this.link = "http://localhost:8000/" + this.contributorId;
		});
	}

	start() {

		let client = new BinaryClient('ws://localhost:9001');

		client.on('open', () => {
			this.Stream = client.createStream({name: this.contributorId});
		});

		let audio = {
			tag: 'audio',
			type: 'audio/ogg',
			ext: '.ogg',
			gUM: {audio: true}
		};
		let context = new AudioContext();
		
		if (!navigator.getUserMedia) {
			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia || navigator.msGetUserMedia;
		}
     
		if (navigator.getUserMedia) {
			navigator.getUserMedia({audio: true }, this.success.bind(this), function(e) {
				alert('Error capturing audio.');
			});
		} else {
			alert('getUserMedia not supported in this browser.');
		}

		this.recording = true;
	}

	stop() {
		this.recording = false;
		this.Stream.end();
		this.route.params.forEach((params: Params) => {
			let contributorId = params['id'];
			this.contributorService.addMessage(contributorId, this.cardId).subscribe();
		});
	}

	recorderProcess(e) {
		let left = e.inputBuffer.getChannelData(0);
		this.Stream.write(this.convertFloat32ToInt16(left));
	}

	success(e) {
		let context = new AudioContext();

      // the sample rate is in context.sampleRate
		let audioInput = context.createMediaStreamSource(e);

		this.recorder = context.createScriptProcessor(2048, 1, 1);

		this.recorder.onaudioprocess = (e) => {
			if (!this.recording) { return; };
			console.log ('recording');
			var left = e.inputBuffer.getChannelData(0);
			this.Stream.write(this.convertFloat32ToInt16(left));
		};

		audioInput.connect(this.recorder);
		this.recorder.connect(context.destination); 
	}

	convertFloat32ToInt16(buffer) {
		let l = buffer.length;
		let buf = new Int16Array(l);
		while (l--) {
			buf[l] = Math.min(1, buffer[l]) * 0x7FFF;
		}
		return buf.buffer;
	}

	play() {
		let message = new Audio();
		message.setAttribute('src', this.link);
		message.load();
		console.log(message);
		message.play();
	}
	

	goBack() {
		this.location.back();
	}
}

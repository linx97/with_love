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
	private Stream;
	private recording = false;
	private contributorId;

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
			console.log(this.contributorId);
		});

		let client = new BinaryClient('ws://localhost:9001');

		client.on('open', () => {
			console.log(this);
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
	}

	start() {
		this.recording = true;
	}

	stop() {
		this.recording = false;
		console.log(this);
		this.Stream.end();
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
	

	goBack() {
		this.location.back();
	}
}

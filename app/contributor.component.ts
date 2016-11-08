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

	constructor(
		private contributorService: ContributorService,
		private cardDetailService: CardDetailService,
		private location: Location,
		private route: ActivatedRoute,
		private router: Router,
	) {}

	ngOnInit() {
		this.requestStream();
		let client = new BinaryClient('ws://localhost:9001');

				client.on('open', function() {
					// for the sake of this example let's put the stream in the window
					this.Stream = client.createStream();
				});
	}

	requestStream() {
		let audio = {
			tag: 'audio',
			type: 'audio/ogg',
			ext: '.ogg',
			gUM: {audio: true}
		};
		let context = new AudioContext();
		
		navigator.mediaDevices.getUserMedia(audio.gUM).then(stream => {
			this.recorder =  new MediaRecorder(stream);
			this.recorder.ondataavailable = (evt) => {

				
				let audioInput = context.createMediaStreamSource(stream);
				let bufferSize = 2048;
				// create a javascript node
				let recorder = context.createScriptProcessor(1024, 1, 1);
				// specify the processing function
				recorder.onaudioprocess = this.recorderProcess;
				// connect stream to our recorder
				audioInput.connect(recorder);
				// connect our recorder to the previous destination
				recorder.connect(context.destination);

				this.chunks.push(evt.data);
				if (this.recorder.state === 'inactive') {

					
					
					console.log("done recording?");
					
				}
			};
		});
	}

	start() {
		console.log(this.recorder);
		
		this.chunks = [];
		this.recorder.start();
	}

	stop() {
		this.recorder.stop();
		console.log(this.chunks);
	}

	recorderProcess(e) {
		let left = e.inputBuffer.getChannelData(0);
		this.Stream.write(this.convertFloat32ToInt16(left));
	}

	convertFloat32ToInt16(buffer) {
		let l = buffer.length;
		let buf = new Int16Array(l);
		while (l--) {
			buf[l] = Math.min(1, buffer[l]) * 0x7FFF;
		}
		return buf.buffer;
	}


	uploadAudio(mp3Data) {
		let reader = new FileReader();
		reader.onload = function(event){
			var fd = new FormData();
			var mp3Name = encodeURIComponent('audio_recording_' + new Date().getTime() + '.mp3');
			console.log("mp3name = " + mp3Name);
			fd.append('fname', mp3Name);
			fd.append('data', (<any>(event.target)).result);


		};
		reader.readAsDataURL(mp3Data);
	}

	

	goBack() {
		this.location.back();
	}
}

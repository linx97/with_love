import { Component } from '@angular/core';
import { ContributorService } from './contributor.service';
import { CardDetailService } from './card-detail.service';
import { CardDetailComponent } from './card-detail.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
declare let navigator: any;
declare let MediaRecorder: any;



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

	constructor(
		private contributorService: ContributorService,
		private cardDetailService: CardDetailService,
		private location: Location,
		private route: ActivatedRoute,
		private router: Router,
	) {}

	ngOnInit() {
		this.requestStream();
	}

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
				this.route.params.forEach((params: Params) => {
					let contributorId = params['id'];

					this.contributorService.addRecording(this.chunks, contributorId, this.cardDetailService.card.id).subscribe((recording) => {
						
					});
				});
				
				console.log("done recording?");
				
			}
		};
	}).catch((err) => {
		console.log(err);
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

	

	goBack() {
		this.location.back();
	}
}

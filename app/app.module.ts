import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from './api.service';
import { UserHomeService } from './user-home.service';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { UserHomeComponent } from './user-home.component';
import { RouterModule } from '@angular/router';
import { CardDetailComponent } from './card-detail.component';
import { CardDetailService } from './card-detail.service';
import { ContributorComponent } from './contributor.component';
import { ContributorService } from './contributor.service';
import { ListenService} from './listen.service';
import { ListenComponent } from './listen.component';
import { MusicSelector } from './music-selector';
import { ValueProvider } from '@angular/core';

const WINDOW_PROVIDER: ValueProvider = {
	provide: Window,
	useValue: window
};

@NgModule({
	imports: [ BrowserModule, FormsModule, HttpModule, RouterModule.forRoot([
			{path: '', redirectTo: '/cards', pathMatch: 'full'},
			{path: 'cards', component: UserHomeComponent },
			{path: 'cards/:id', component: CardDetailComponent },
			{path: 'record/:cardid/:id', component: ContributorComponent },
			{path: 'listen/:id', component: ListenComponent }
		]) ],
	declarations: [ AppComponent, UserHomeComponent, ContributorComponent, CardDetailComponent, ListenComponent, MusicSelector ],
	providers: [ ApiService, UserHomeService, CardDetailService, ContributorService, ListenService, WINDOW_PROVIDER ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }

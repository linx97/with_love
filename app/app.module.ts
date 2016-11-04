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


@NgModule({
	imports: [ BrowserModule, FormsModule, HttpModule, RouterModule.forRoot([
			{path: '', redirectTo: '/cards', pathMatch: 'full'},
			{path: 'cards', component: UserHomeComponent },
			{path: 'cards/:id', component: CardDetailComponent },
			{path: 'record/:id', component: ContributorComponent }
		]) ],
	declarations: [ AppComponent, UserHomeComponent, ContributorComponent, CardDetailComponent ],
	providers: [ ApiService, UserHomeService, CardDetailService, ContributorService ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }

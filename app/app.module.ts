import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from './api.service';
import { CardService } from './card.service';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { CardComponent } from './card.component';
import { RouterModule } from '@angular/router';


@NgModule({
	imports: [ BrowserModule, FormsModule, HttpModule, RouterModule.forRoot([
			{path: '', redirectTo: '/cards', pathMatch: 'full'},
			{path: 'cards', component: CardComponent },
		]) ],
	declarations: [ AppComponent, CardComponent ],
	providers: [ ApiService, CardService, ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }

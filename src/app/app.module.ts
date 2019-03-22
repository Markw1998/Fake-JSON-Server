import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarlistComponent } from './components/carlist/carlist.component';
import { CarComponent } from './components/car/car.component';
import { HttpClientModule } from '@angular/common/http';
import { AddCarComponent } from './components/add-car/add-car.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    CarlistComponent,
    CarComponent,
    AddCarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

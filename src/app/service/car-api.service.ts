import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Car } from 'src/Car';

@Injectable({
  providedIn: 'root'
})

export class CarApiService {

  private _siteURL = 'http://localhost:3000/car_data';

  carDataCollection: AngularFirestoreCollection<ICar>;

  carsData: Observable<ICar[]>;

  allCarsData: ICar[];
  errorMessage: any;
  _carAPIService: any;

  constructor(private _http: HttpClient, private _afs: AngularFirestore) {
    this.carDataCollection = _afs.collection<ICar>("cars_data");
  }

  getCarData(): Observable<ICar[]> {
    // return this._http.get<ICar[]>(this._siteURL)
    // .pipe(tap(data => console.log('All: ' + JSON.stringify(data))),
    // catchError(this.handleError));

    this.carsData = this.carDataCollection.valueChanges();


    this.carsData.subscribe(data => console.log("getCarsData: " + JSON.stringify(data)))
    return this.carsData;
  }

  addCarData(car: ICar): void {
    this.carDataCollection.add(JSON.parse(JSON.stringify(car)));
  }

  addTheCar(make:string, model:string, year:string,imageURL: string): boolean{
    let tempCar:ICar;
    tempCar = new Car(make,model,year,imageURL);
    this._carAPIService.addCarData(tempCar);
    return false;
  }

  addAllProducts() {
    this._http.get<ICar[]>(this._siteURL).subscribe(
      carsData => {
        this.allCarsData = carsData;
    for (let car of this.allCarsData) {
      console.log("Adding: Make:" + car.make + "- Model " + car.model);
      this.carDataCollection.add(car);
    }
    error => (this.errorMessage = <any>error) 
  });
  }

  private handleError(err: HttpErrorResponse) {
    console.log('CarAPIService: ' + err.message);
    return Observable.throw(err.message);

  }
}

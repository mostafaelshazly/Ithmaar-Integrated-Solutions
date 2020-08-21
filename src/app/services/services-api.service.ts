import { Injectable } from '@angular/core';
import { Data } from '../get-data/get-data.component';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {throwError} from 'rxjs';

import { Component } from '@angular/core';
import { startWith} from 'rxjs/operators';
import {combineLatest, of} from 'rxjs';
import {FormControl} from '@angular/forms';
import {  filter, scan } from 'rxjs/operators';




import {Observable} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})


export class ServicesAPIService {




  states$: Observable<Data[]>;
  filteredStates$: Observable<Data[]>;
  filter: FormControl;
  filter$: Observable<string>;
   data: Data[];

  constructor(private http:HttpClient ) {
 
  }

 

  private handleError(err: HttpErrorResponse) {
 
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {

        errorMessage = `An error occurred: ${err.error.message}`;
    } else {

        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
}
retrieveAndSortByPrice(staertDate:Date ,endDate:Date ) : Observable<Data[]>{
  return this.states$ =this.http.get<Data[]>(`https://api.npoint.io/d8c6ab8ac5307d469528`).pipe(
    map(messages => messages.sort((a1: Data, a2: Data) =>a2.price   - a1.price ))
  );

}

retrieveAndSortByName(staertDate:Date ,endDate:Date ) : Observable<Data[]>{
  return this.states$ =this.http.get<Data[]>(`https://api.npoint.io/d8c6ab8ac5307d469528`).pipe(
    map(messages => messages.sort((a1: Data, a2: Data) => {
        if(a1.name < a2.name) return -1;
        if(a1.name > a2.name) return 1;
        return 0;
    }))
);

}


retrieve(staertDate:Date ,endDate:Date ) : Observable<Data[]> {

  this.states$ =this.http.get<Data[]>(`https://api.npoint.io/d8c6ab8ac5307d469528`);
 
  this.filter = new FormControl('');

  let start = "2020-09-20";
let end = "2020-10-30";


  
  this.filter$ = this.filter.valueChanges.pipe(startWith(""));
  return this.filteredStates$ = combineLatest(this.states$, this.filter$).pipe(
    
    map(([states, filterString]) => states.filter(
      
      
      m =>  new Date(m.available_on) >= new Date(staertDate) && new Date(m.available_on) 
      <= new Date(endDate)))
  );
  
}


filterByCity(city:String ) : Observable<Data[]> {

  this.states$ =this.http.get<Data[]>(`https://api.npoint.io/d8c6ab8ac5307d469528`);

  this.filter = new FormControl('');

  this.filter$ = this.filter.valueChanges.pipe(startWith(""));
  return this.filteredStates$ = combineLatest(this.states$, this.filter$).pipe(
    
    map(([states, filterString]) => states.filter(
      
      
      m =>  m.city===city) )
  );
  
}



filterByName(name:String ) : Observable<Data[]> {

  this.states$ =this.http.get<Data[]>(`https://api.npoint.io/d8c6ab8ac5307d469528`);
 
 
  this.filter = new FormControl('');


  this.filter$ = this.filter.valueChanges.pipe(startWith(""));
  return this.filteredStates$ = combineLatest(this.states$, this.filter$).pipe(
    
    map(([states, filterString]) => states.filter(
      
      
      m =>  m.name===name) )
  );
  
}
}
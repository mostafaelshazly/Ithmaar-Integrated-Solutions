import { Component, OnInit } from '@angular/core';
import { ServicesAPIService } from '../services/services-api.service';
import { Router } from '@angular/router';
import { Time } from '@angular/common';

export class Data {
  constructor(
    public available_on: Date,
    public totalPrice: number,
    public price: number,
    public city: string,
    public name: string,
   
  ){

  }
}

@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.css']
})
export class GetDataComponent implements OnInit {

  public data: Data[];
  public startDate:Date;
  public endDate:Date;
  public Difference_In_Time : any
  public Difference_In_Days : any =0;
  price:boolean=false;
  name:boolean=false;
  result:any;
  nights:any;
  hotelPrice:any;
  




  constructor(
    private ServicesAPIService:ServicesAPIService,
    private router : Router
  ) { }
  
  
  ngOnInit() {
    let start = "2020-09-20";
    let end = "2020-10-30";
    //this.refresh();
  }

  onClickMe() {
    var scr = document.getElementById('exampleInput'); 
    let val: Date  

  }
  refreshAndSort(){
    if (this.price!=true){
      this.name=false;



    const oneDay = 1000 * 60 * 60 * 24;

       var start    = new Date(this.startDate);
       var end = new Date(this.endDate);
  
   var result= Math.abs(start.getTime() - end.getTime()) /(1000*60*60*24);
   this.nights = "number of nights  : "+ result;
   var price
   this.hotelPrice=" hotel price"+"kk";
        
 
    


    this.ServicesAPIService.retrieveAndSortByPrice(this.startDate ,this.endDate ).subscribe(
      response => {
        this.data = response;

        for (var i in this.data) {
          this.data[i].totalPrice =this.data[i].price*result
    
        }

    
        });
       
      }
      else{
        this.refresh()

      }

  }

  refreshAndSortByName(){
    if (this.name!=true){
            this.price=false;




    const oneDay = 1000 * 60 * 60 * 24;

    // A day in UTC always lasts 24 hours (unlike in other time formats)
       var start    = new Date(this.startDate);
       var end = new Date(this.endDate);
  
   var result= Math.abs(start.getTime() - end.getTime()) /(1000*60*60*24);
   this.nights = "number of nights  : "+ result;
   var price
   this.hotelPrice=" hotel price"+"kk";
        
 
    


    this.ServicesAPIService.retrieveAndSortByName(this.startDate ,this.endDate ).subscribe(
      response => {
        this.data = response;

        for (var i in this.data) {
          this.data[i].totalPrice =this.data[i].price*result
    
        }

    
        });
       
      }
      else{
        this.refresh()

      }

  }


  refresh(){


  
    const oneDay = 1000 * 60 * 60 * 24;

       var start    = new Date(this.startDate);
       var end = new Date(this.endDate);
  
   this.result= Math.abs(start.getTime() - end.getTime()) /(1000*60*60*24);
   this.nights = "number of nights  : "+  this.result;
   var price
   this.hotelPrice=" hotel price"+"kk";
        
 
    


    this.ServicesAPIService.retrieve(this.startDate ,this.endDate ).subscribe(
      response => {
        this.data = response;

        for (var i in this.data) {
          this.data[i].totalPrice =this.data[i].price* this.result
    
        }

    
        });
       
          }
    
          filterByName(name:String){
            this.ServicesAPIService.filterByName(name ).subscribe(
              response => {
                this.data = response;
        
                for (var i in this.data) {
                  this.data[i].totalPrice =this.data[i].price* this.result
            
                }
        
            
                });

          }
     

          filterByCity(city:String){
            this.ServicesAPIService.filterByCity(city ).subscribe(
              response => {
                this.data = response;
        
                for (var i in this.data) {
                  this.data[i].totalPrice =this.data[i].price* this.result
            
                }
        
            
                });

          }


}

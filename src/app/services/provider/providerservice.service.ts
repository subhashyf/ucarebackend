import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public httpOptions : any;

  constructor(private _http : HttpClient) {
    //Http Headers Options
    this.httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json; charset=utf-8',
          'BrowserToken' : 'auth_Token'})
    }
  }

  //Get Customer API CALL
  public getCustomer(baseUrl : string) {
    return this._http.get(baseUrl);
  };

  //Get Customer Model
  public getCustomerModel(baseUrl : string) {
    return this._http.get(baseUrl);
  };

  //Add Customer API call.
  public addCustomer (baseUrl : string, customer :any){
    return this._http.post(baseUrl, customer, this.httpOptions);
  }
}
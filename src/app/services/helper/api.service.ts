import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { environment } from './../../../environments/environment';

@Injectable({ providedIn: 'root' })

export class ApiService {

  public httpOptions : any;
  
  constructor(private _http : HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }) //, 'BrowserToken' : 'auth_Token'
    }
  }

  //COUNT
  public getCount (baseUrl : string) {
    return this._http.get(environment.apiBaseUrl + baseUrl);
  };

  //CREATE
  public getCreate (baseUrl : string, postData :any){
    return this._http.post(environment.apiBaseUrl + baseUrl, postData, this.httpOptions);
  };

  //DESTROY
  public getDestroy (baseUrl : string) {
    return this._http.delete(environment.apiBaseUrl + baseUrl);
  };

  //FIND
  public getFind (baseUrl : string) {
    return this._http.get(environment.apiBaseUrl + baseUrl);
  };

  //FIND-ONE
  public getFindOne (baseUrl : string) {
    return this._http.get(environment.apiBaseUrl + baseUrl);
  };

  //UPDATE 
  public getUpdate (baseUrl : string, postData :any){
    return this._http.put(environment.apiBaseUrl + baseUrl, postData, this.httpOptions);
  };

  //CHECK TOKEN 
  public checkToken (){
    return (!((localStorage.getItem("token") == null) || (typeof(localStorage.getItem("token")) == 'undefined') || ((localStorage.getItem("token").toString().trim().toLowerCase()) == 'null')));
  };
  
}
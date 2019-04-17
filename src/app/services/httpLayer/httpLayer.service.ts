import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpLayerService {
  public httpOptions : any;

  constructor(private _http : HttpClient) {
    //Http Headers Options
    this.httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'json',
          'BrowserToken' : 'auth_Token'})
    }
  }

  //GET API CALL
  public hitGet (baseUrl : string) {
    return this._http.get(baseUrl);
  };

  //DELETE API CALL
  public hitDelete (baseUrl : string) {
    return this._http.delete(baseUrl);
  };

  //POST API CALL
  public hitPost (baseUrl : string, postData :any){
    return this._http.post(baseUrl, postData, this.httpOptions);
  };

  //PUT API CALL
  public hitPut (baseUrl : string, postData :any){
    return this._http.put(baseUrl, postData, this.httpOptions);
  };
  
}
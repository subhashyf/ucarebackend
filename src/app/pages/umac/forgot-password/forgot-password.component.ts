import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { ApiService } from '../../../services/helper/api.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'ngx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})

export class ForgotPasswordComponent implements OnInit {

	public email;
	public loading;
	public errMsg = null;
	public successMsg = null;

	constructor( private _http: HttpClient, private _service: ApiService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params.subscribe(params => { });
	}

	loginFormSubmit(e) {
		this.loading = true;
	    this.updateData();
    }

    updateData() {
    	this.loading = true;
    	this._service.getCreate('auth/forgot-password', {"email": this.email, "url": (environment.appBaseUrl + '#/pages/umac/reset-password') }).subscribe(data => {
    		this.successMsg = "Please check your email " + this.email + " for further procedure to reset your account password";
			this.errMsg = null;
			
		}, error => {
			this.successMsg = null;
    		this.loading = false;
			this.errMsg = error.error.error + ", " + error.error.message;
		});
	}

}
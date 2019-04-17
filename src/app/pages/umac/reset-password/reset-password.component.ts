import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { ApiService } from '../../../services/helper/api.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})

export class ResetPasswordComponent implements OnInit {

	public privateCode;
	public password;
	public passwordConfirmation;
	public loading;
	public errMsg = null;
	public successMsg = null;

	constructor( private _http: HttpClient, private _service: ApiService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.queryParams.subscribe(params => { this.privateCode = (params['code']); console.log(this.privateCode); });
	}

	loginFormSubmit(e) {
		this.loading = true;
	    this.updateData();
    }

    updateData() {
    	this.loading = true;
    	this._service.getCreate('auth/reset-password', {"code": this.privateCode, "password": this.password, "passwordConfirmation": this.passwordConfirmation}).subscribe(data => {
    		this.successMsg = "Your password successfully updated, it is suggested to re-login with a new credential(s)";
			this.errMsg = null;
			
		}, error => {
			this.successMsg = null;
    		this.loading = false;
			this.errMsg = error.error.error + ", " + error.error.message;
		});
	}

}
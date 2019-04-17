import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { ApiService } from '../../../services/helper/api.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

	public identifier;
	public password;
	public loading;
	public errMsg = null;
	public successMsg = null;

	constructor( private _http: HttpClient, private _service: ApiService, private route: ActivatedRoute) { }

	ngOnInit() {
		localStorage.setItem("user", null);
		localStorage.setItem("token", null);
		localStorage.setItem("role", null);
		localStorage.setItem("permission", null);
		this.route.params.subscribe(params => { });
	}

	loginFormSubmit(e) {
		this.loading = true;
	    this.updateData();
    }

    goBackScript(event) {
	    event.preventDefault();
	    this.loading = true;
	    window.history.back();
    }

    updateData() {
    	this.loading = true;
    	this._service.getCreate('auth/local', {"identifier": this.identifier, "password": this.password, rememberMe: true}).subscribe(data => {
    		this.successMsg = "Welcome " + data['user']['username'];
			this.errMsg = null;
    		localStorage.setItem("token", data['jwt']);
			localStorage.setItem("user", JSON.stringify((data['user'])));
			this._service.getCount('users-permissions/roles/' + (data["user"]["role"]["_id"])).subscribe(dataRole => {
    			localStorage.setItem("permissions", JSON.stringify((dataRole["role"]["permissions"])));
    			localStorage.setItem("permission", JSON.stringify((dataRole["role"]["permissions"]["application"]["controllers"])));
    			localStorage.setItem("role", JSON.stringify((dataRole["role"])));
	    		setTimeout(function() { window.location.href = './#/pages/'; }, 500);
			}, error => {
				this.successMsg = null;
    			this.loading = false;
				localStorage.setItem("token", null);
    			this.errMsg = error.error.error + ", " + error.error.message;
			});
		}, error => {
			this.successMsg = null;
    		this.loading = false;
			localStorage.setItem("token", null);
			this.errMsg = error.error.error + ", " + error.error.message;
		});
	}

}
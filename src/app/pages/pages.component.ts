import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { ApiService } from '../services/helper/api.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';

import { ALL_MENU_ITEMS, OPERATOR_MENU_ITEMS, PUBLIC_MENU_ITEMS } from './pages-menu';


@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})

export class PagesComponent implements OnInit {

  public menu = ALL_MENU_ITEMS;

	constructor(private _http: HttpClient, private _service: ApiService, private route: ActivatedRoute, private _router: Router) { }

	ngOnInit() {
    	if (!this._service.checkToken()) this._router.navigate(['pages/umac/login']);
		//this.getMenu();
	}

	getMenu()
	{
		var role = (JSON.parse(localStorage.getItem("role")));
		if ((role == null) || (typeof(role) == 'undefined') || (role.name == null) || (typeof(role.name) == 'undefined')) role = { name: "" };
		switch(role.name.toString().toLowerCase().trim())
		{
			case "administrator": this.menu = ALL_MENU_ITEMS; break;
			case "authenticated": this.menu = ALL_MENU_ITEMS; break;
			case "public": this.menu = PUBLIC_MENU_ITEMS; break;
			case "consumerlist": this.menu = OPERATOR_MENU_ITEMS; break;
			default: this.menu = [];
		}
		/*
		for (var key in permissions.application.controllers) {
			if (permissions.application.controllers.hasOwnProperty(key)) {
				for (var innerKey in permissions.application.controllers[key]) {
					if (permissions.application.controllers[key].hasOwnProperty(innerKey) && innerKey == "find" && (permissions.application.controllers[key]['find']['enabled'])) {
						//console.log(key + ": " + permissions.application.controllers[key]['find']['enabled']);
						var _TITLE = (key).toUpperCase();
						var _LINK = ("/pages/" + (key).toLowerCase() + "/manage");
						var obj = { "title": _TITLE, "link": _LINK };
						data.push(obj);
					}
				}
			}
		}
		*/
	}

}

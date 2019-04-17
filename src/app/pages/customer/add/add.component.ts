import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { ApiService } from '../../../services/helper/api.service';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class CustomerAddComponent implements OnInit {
	
	public customerAdd = {};

	constructor(private _http: HttpClient, private _service: ApiService) { }

	ngOnInit() { this.refreshThisPage(); }
	
	refreshThisPage() { }

	goBackScript(event)
	{
		event.preventDefault();
		window.history.back();
	}

	customerFormSubmit(e) {
		this.addData(this.customerAdd);
	}

	addData(form) {
		this._service.getCreate('customers', form).subscribe(data => {
			window.location.href = '/#/pages/customer/manage';
		});
	}

}

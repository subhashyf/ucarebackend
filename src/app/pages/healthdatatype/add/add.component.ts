import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { HttpLayerService } from '../../../services/httpLayer/httpLayer.service';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class HealthDataTypeAddComponent implements OnInit {
	
	public formData = null;

	onSubmitHealthDataTypeAddForm(e) {
		var input = {
			'HDTCategory': (e.form.controls.HDTCategory.value),
			'HDTDescription': (e.form.controls.HDTDescription.value),
			'HDTName': (e.form.controls.HDTName.value),
			'HDTSubCategory': (e.form.controls.HDTSubCategory.value),
		};
		var formData1 = {
			'f': 'api_custom_add',
			'tableName': 'tb_health_data_type_master',
			'input': input
		};
		//console.log(e.form.controls);
		this.postdata(formData1);
	}

	constructor( private _http: HttpClient, private _service: HttpLayerService) { }

	ngOnInit() { this.getdata(); }

	getdata() {
	    this._service.httpOptions = {
	      headers: new HttpHeaders({
	        'Content-Type': 'json', //'application/x-www-form-urlencoded',
	      })
	    }
		this._service.hitGet("http://10.1.2.179:1337/users").subscribe(data => {
			alert(data);
			console.log(data);
		});
	}

	postdata(formData) {
		var formData1 = formData;
		if (formData1 == null)
		{
			formData1 = { f: 'api_check_post', tableName: 'tableName' };
		}
		this._service.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'json', //application/x-www-form-urlencoded',
			})
		}

		this._service.hitPost("http://localhost:9090/ucare/api/api.php", formData1).subscribe(data => {
			
			if (data['status'] == true)
			{
				window.location.href = '../#/pages/healthdatatype/manage';
			}
			else
			{
				alert(data['message']);
			}
		});
	}

	goBackScript(event)
	{
		event.preventDefault();
		window.history.back();
	}

}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { HttpLayerService } from '../../../services/httpLayer/httpLayer.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class HealthDataTypeEditComponent implements OnInit {

	public formData = null;
	public HDTId = null;
	public HDTCategory = null;
	public HDTSubCategory = null;
	public HDTName = null;
	public HDTDescription = null;

	onSubmitHealthDataTypeEditForm(e) {
		var input = {
			'id': (e.form.controls.HDTId.value),
			'HDTCategory': (e.form.controls.HDTCategory.value),
			'HDTDescription': (e.form.controls.HDTDescription.value),
			'HDTName': (e.form.controls.HDTName.value),
			'HDTSubCategory': (e.form.controls.HDTSubCategory.value),
		};
		var formData1 = {
			'f': 'api_custom_update',
			'tableName': 'tb_health_data_type_master',
			'input': input
		};
		//console.log(e.form.controls);
		this.postdata(formData1);
	}

	constructor( private _http: HttpClient, private _service: HttpLayerService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
	      //console.log(params) //log the entire params object
	      //console.log(params['id']) //log the value of id
	      //alert("id is : " + (params['id']));
	      this.HDTId = (params['id']);
	      this.HDTCategory = "Loadng...";
	      this.HDTSubCategory = "Loadng...";
	      this.HDTName = "Loadng...";
	      this.HDTDescription = "Loadng...";
	      this.getdata(this.HDTId);
	    });
	}

	getdata(id) {
	    this._service.httpOptions = {
	      headers: new HttpHeaders({
	        'Content-Type': 'json', //'application/x-www-form-urlencoded',
	      })
	    }
		var formData1 = {
			'f': 'api_custom_get',
			'tableName': 'tb_health_data_type_master',
			'id': this.HDTId
		};
		this._service.hitPost("http://localhost:9090/ucare/api/api.php", formData1).subscribe(data => {
			//alert(data['message']);
			if (data['status'] == true)
			{				
		      this.HDTId = data['data'][0]['id'];
		      this.HDTCategory = data['data'][0]['HDTCategory'];
		      this.HDTSubCategory = data['data'][0]['HDTSubCategory'];
		      this.HDTName = data['data'][0]['HDTName'];
		      this.HDTDescription = data['data'][0]['HDTDescription'];
			}
			else
			{
				alert(data['message']);
				window.location.href = '../#/pages/healthdatatype/manage';
			}
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

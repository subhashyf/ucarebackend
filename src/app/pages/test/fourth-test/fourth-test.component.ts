import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { HttpLayerService } from '../../../services/httpLayer/httpLayer.service';

@Component({
  selector: 'ngx-fourth-test',
  templateUrl: './fourth-test.component.html',
})

export class FourthTestComponent implements OnInit {

	tests = [{
		id: 1, value: 'check1', text: 'Check Box - 1', selected: 'checked'
	},
	{
		id: 2, value: 'check2', text: 'Check Box - 2', selected: ''
	},
	{
		id: 3, value: 'check3', text: 'Check Box - 3', selected: ''
	}];

	options = [{
		id: 1, value: 'radio1', text: 'Radio Box - 1', selected: 'checked'
	},
	{
		id: 2, value: 'radio2', text: 'Radio Box - 2', selected: ''
	},
	{
		id: 3, value: 'radio3', text: 'Radio Box - 3', selected: ''
	}];

	onSubmit(e) {
		console.log(e);
		var formData = {
			inputText: (e.form.controls.inputText.value),
			inputNumber: (e.form.controls.inputNumber.value),
			inputUrl: (e.form.controls.inputUrl.value),
			inputEmail: (e.form.controls.inputEmail.value),
			inputPassword: (e.form.controls.inputPassword.value),
			inputFile: (e.form.controls.inputFile.value),
			inputDate: (e.form.controls.inputDate.value),
			inputTime: (e.form.controls.inputTime.value),
			inputSelect: (e.form.controls.inputSelect.value)
		};
		this.postdata(formData);
	}

	constructor( private _http: HttpClient, private _service: HttpLayerService) { }

	ngOnInit() { this.postdata(null); }

	postdata(formData) {
		var formData1 = {};
		if (formData == null)
		{
			formData1 = { f: 'api_check_post' };
		}
		else
		{
			formData1 = formData;
		}
		formData1['f'] = 'api_check_post';
		this._service.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded',
			})
		}

		this._service.hitPost("http://localhost:9090/ucare/api/api.php", formData1).subscribe(data => {
			console.log(data);
		});
	}
}

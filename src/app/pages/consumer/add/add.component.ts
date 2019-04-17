import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { ApiService } from '../../../services/helper/api.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';

@Component({
	selector: 'ngx-add',
	styleUrls: ['./add.component.scss'],
	templateUrl: './add.component.html',
})

export class ConsumerAddComponent implements OnInit {
	
	public fileReaded: any;

	public options = {
		fieldSeparator: ',',
		quoteStrings: '"',
		decimalseparator: '.',
		showLabels: true,
		showTitle: true,
		title: 'My Custom Title Report',
		useBom: true,
		noDownload: true,
		nullToEmptyString: true,
	};

	public dataInput = [{
		"consumerType": "Viewer",
		"status": "Suspended",
		"height": 5.2,
		"weight": 80.7,
		"smoker": "Yes",
		"alcoholic": "No",
		"bloodGroup": "B+",
		"diabetic": "Yes",
		"userId": "5cadaee27aaa26444ed9c0ae"
	}, {
		"consumerType": "Customer",
		"status": "Inactive",
		"height": 5.4,
		"weight": 85.5,
		"smoker": "No",
		"alcoholic": "Yes",
		"bloodGroup": "A+",
		"diabetic": "Yes",
		"userId": "5cadaee27aaa26444ed9c0ae"
	}, {
		"consumerType": "Subscriber",
		"status": "Active",
		"height": 5.6,
		"weight": 57.9,
		"smoker": "Yes",
		"alcoholic": "No",
		"bloodGroup": "O+",
		"diabetic": "No",
		"userId": "5cadaee27aaa26444ed9c0ae"
	}, {
		"consumerType": "Doctor",
		"status": "Pending",
		"height": 5.5,
		"weight": 79.0,
		"smoker": "No",
		"alcoholic": "Yes",
		"bloodGroup": "A-",
		"diabetic": "No",
		"userId": "5cadaee27aaa26444ed9c0ae"
	}, {
		"consumerType": "Care Giver",
		"status": "Approved",
		"height": 5.3,
		"weight": 81.3,
		"smoker": "Yes",
		"alcoholic": "No",
		"bloodGroup": "B-",
		"diabetic": "Yes",
		"userId": "5cadaee27aaa26444ed9c0ae"
	}];

	constructor( private _http: HttpClient, private _service: ApiService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
		});
	}

	hitBulkData(formData) {
		this._service.getCreate('consumerDoctorBulkPost', formData).subscribe(dataOutput => {
			console.log(dataOutput);
		});
	}

	goBackScript(event) {
		event.preventDefault();
		window.history.back();
	}

	convertFile(event) {
		const reader = new FileReader();
		reader.onload = () => {
			this.hitBulkData(this.csvJSON(reader.result));
		};
		reader.readAsText((<HTMLInputElement>document.getElementById('fileInput')).files[0]);
	}

	public csvJSON(csv) {
		var lines = csv.toString().split(/\r|\n|\r/);
		var result = [];
		var headers = lines[0].toString().split(",");
		for (var i = 1; i < lines.length; i++) {
			var obj = {};
			var currentline = lines[i].toString().split(",");
			for (var j = 0; j < headers.length; j++) obj[headers[j]] = currentline[j];
			if ((obj[headers[0]] != null) && (typeof(obj[headers[0]]) != 'undefined') && (obj[headers[0]].toString().trim().length > 0)) result.push(obj);
		}
		return result; //JavaScript object
		//return JSON.stringify(result); //JSON
	}

}
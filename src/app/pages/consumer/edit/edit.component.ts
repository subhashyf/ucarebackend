import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { ApiService } from '../../../services/helper/api.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import {NgForm} from '@angular/forms';

import { ModalComponent } from '../manage/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from './../excel.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'ngx-edit',
  styleUrls: ['./edit.component.scss'],
  templateUrl: './edit.component.html',
})

export class ConsumerEditComponent implements OnInit {

  public consumerId = "";
  public consumerModel = {};
  public consumerModelData = {};
  public tabData = {};
  public loading;
  public tabListKey = [];
  public deleteRecordIds = [];
  public getRelatedTabs = {};
  public apiURL;
  public orderByState = "ASC";
  public totalPages = 0;
  public totalRecordCount = 0;
  public tabShowRecordCount = 0;
  public tabShowRecordPerPageCount = 10;
  public tabCurrentPage = 1;
  public searchString;
  public modelName = "";
  public Url = "";
  
  public consumerAttributes = {};
  	getModel() {
	  this._service.getFind(this.Url).subscribe(data => {
		    this.consumerModel = data;
		    if(data['model']){
		    	var j = 0;
				this.consumerAttributes = data['model'].attributes;
				var interData:any;
				interData = this.consumerAttributes;
				this.getRelatedTabs = interData.filter(item => item.params.isVirtual == true);
			}
			var url = this.modelName+"/"+this.consumerId;
			
			this._service.getFind(url).subscribe(data => {
				this.consumerModelData = data;
				console.log(this.consumerModelData);
			});
		});
	}

	constructor( private excelService: ExcelService, private modalService: NgbModal, private _http: HttpClient, private _service: ApiService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
		    this.consumerId = (params['id']);
		    this.modelName = (params['model']) + "s";
		    this.Url = "content-type-builder/models/" + (params['model']);
		    this.getModel();
		});
	}

	public dependantMemberModelName = "consumers";

	 public dependantMemberList;
	 
	 //Get relation table data
	 getTableData(attribute){
	 	var url = attribute.targetColumnName + "?"+ attribute.key +"=" +this.consumerId +"&_start=" + ((this.tabCurrentPage - 1) * (this.tabShowRecordPerPageCount)) +"&_limit=" + this.tabShowRecordPerPageCount;
	 	this._service.getFind(url).subscribe(data => {
			var keysdata = Object.keys(data[0]);
			for(var i = 0;i<keysdata.length;i++) { 
			   this.tabListKey.push(keysdata[i]); 
			}
			this.tabData = data;
			this.tabShowRecordCount = data['length'];
			var counturl = attribute.targetColumnName + "/count?"+ attribute.key +"=" +this.consumerId;
			this._service.getFind(counturl).subscribe(data => {
				var interData:any;
				interData = data;
				this.totalRecordCount = interData;
				this.totalPages = Math.ceil(this.totalRecordCount / this.tabShowRecordCount);
			});
		});
	 }

	 getSearchTableData(attribute){
	 	var url = attribute.targetColumnName + "/search?"+ attribute.key +"=" +this.consumerId +"&_start=" + ((this.tabCurrentPage - 1) * (this.tabShowRecordPerPageCount)) +"&_limit=" + this.tabShowRecordPerPageCount;
	 	this._service.getFind(url).subscribe(data => {
			var keysdata = Object.keys(data[0]);
			for(var i = 0;i<keysdata.length;i++) { 
			   this.tabListKey.push(keysdata[i]); 
			}
			this.tabData = data;
			this.tabShowRecordCount = data['length'];
			var counturl = attribute.targetColumnName + "/count?"+ attribute.key +"=" +this.consumerId;
			this._service.getFind(counturl).subscribe(data => {
				var interData:any;
				interData = data;
				this.totalRecordCount = interData;
				this.totalPages = Math.ceil(this.totalRecordCount / this.tabShowRecordCount);
			});
		});
	 }

	 deleteRecord(event, rowId, targetTable)
	 {
	 	var deleteurl = targetTable+"/"+rowId;
	 	this._service.getDestroy(deleteurl).subscribe(data => {
			window.location.reload();
		});
	 }

	 getDeleteRowIds(event, rowId){
	 	console.log(rowId);
	 	//this.deleteRecordIds.push(rowId);
	 }

	 //On tabchange call
	 onChangeTab(event)
	 {
	 	this.tabData = "";
	 	this.tabListKey = [];
	 	this.loading = true;
	   if(event.tabTitle != "Consumer Information"){
	   	var attribute = this.getTableName(event.tabTitle);
	   	this.getTableData(attribute);
	   }
	   this.loading = false;
	 }

	 //Get Relation Attributes Info
	 getTableName(attrtitle){
	 	var interData: any;
	 	interData = this.consumerAttributes;
	 	var record = interData.find(result => result.name == attrtitle);
	 	return record.params;
	 }

	pageNext(event, attribute) {
	    this.loading = true;
	    if (this.tabCurrentPage < this.totalPages) {
	    	this.tabCurrentPage++;
	    	this.getTableData(attribute);
	    }
	   this.loading = false; 
	}
  
  pagePrev(event, attribute) {
    this.loading = true;
    if (this.tabCurrentPage > 1) {
    	this.tabCurrentPage--;
    	this.getTableData(attribute);
    }
    this.loading = false;
  }

  pageChange(event, attribute){
  	this.loading = true;
    if (this.tabCurrentPage < this.totalPages) {
    	this.tabCurrentPage++;
    	this.getTableData(attribute);
    }
    this.loading = false;
  }

  pageSizeChange(event, attribute){
  	this.loading = true;
  	console.log("GGGG"+ this.tabShowRecordPerPageCount);
    if (this.tabShowRecordPerPageCount > 0) {
    	this.getTableData(attribute);
    }
    this.loading = false;
  }

  serachRecord(event, attribute){
  	this.loading = true;
  	console.log("GGGG"+ this.tabShowRecordPerPageCount);
    if (this.tabShowRecordPerPageCount > 0) {
    	this.getTableData(attribute);
    }
    this.loading = false;
  }

  toggleCheckBoxes(event) {
    this.loading = true;
    $('.rowChecks').each(function() {
      $(this).prop('checked', (($('#headCheck').prop('checked')) ? (true) : (false)));
    });
    this.loading = false;
  }

  consumerFormSubmit(form: NgForm) {
  	this.loading = true;
    this._service.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    if(this.consumerId == undefined){
    	console.log("Insert");
	    var updateUrl = 'consumers/';
	    this._service.getCreate(updateUrl, this.consumerModelData).subscribe(data => {
	      console.log(data);
	      window.location.href = '/#/pages/consumer/manage';
	      this.loading = false;
	    });
	    this.loading = false;
	}else{
		console.log("Update");
		var updateUrl = 'consumers/' + this.consumerId;
	    this._service.getUpdate(updateUrl, this.consumerModelData).subscribe(data => {
	      console.log(data);
	      window.location.href = '/#/pages/consumer/manage';
	      this.loading = false;
	    });
	    this.loading = false;
	}
  }
}
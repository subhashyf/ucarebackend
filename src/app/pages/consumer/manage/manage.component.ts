import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { ApiService } from '../../../services/helper/api.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

import { ModalComponent } from './modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from './../excel.service';
import * as XLSX from 'xlsx';

@Component({
selector: 'ngx-manage',
  styleUrls: ['./manage.component.scss'],
  templateUrl: './manage.component.html',
})

export class ConsumerManageComponent implements OnInit {

  
   public loading;

  public modelName;

  public consumerList;
  
  public totalConsumerRecords;
  
  public showingConsumerRecords;
  
  public lastConsumerPage;

  public apiURL;
  public orderByState = "ASC";
  public totalPages = 0;
  public totalRecordCount = 0;
  public tabShowRecordCount = 0;
  public tabShowRecordPerPageCount = 10;
  public tabCurrentPage = 1;
  public searchString = "";
  public tabListKey = [];
  public tabData;
  public deleteRecordIds = [];
  public checkAll = "";
  public recordRow = [];
  public modelUrl;

  dtPageSizes = [
    { 'value' : 1, 'text' : '1' },
    { 'value' : 2, 'text' : '2' },
    { 'value' : 5, 'text' : '5' },
    { 'value' : 10, 'text' : '10' },
    { 'value' : 20, 'text' : '20' },
    { 'value' : 50, 'text' : '50' },
    { 'value' : 100, 'text' : '100' },
    { 'value' : 200, 'text' : '200' },
    { 'value' : 500, 'text' : '500' },
    { 'value' : 2000, 'text' : '2000' },
    { 'value' : 10000, 'text' : '10000' }
  ];
  
  public consumerPages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  
  public getConsumerFormData = {
    'modelUrl': this.modelName,
    'searchText': '',
    'orderColumn': 'id',
    'orderType': 'DESC',
    'pageNo': 1,
    'pageSize': 5,
  };


  constructor(private excelService: ExcelService, private modalService: NgbModal, private _http: HttpClient, private _service: ApiService, private route: ActivatedRoute) { }

  ngOnInit() { 
    this.route.params.subscribe(params => {
        this.modelUrl = (params['model']);
        this.modelName = (params['model'])+"s";
        this.refreshThisPage();
    });
  }


  refreshThisPage() { 
    this.apiURL;
    this.orderByState = "ASC";
    this.totalPages = 0;
    this.totalRecordCount = 0;
    this.tabShowRecordCount = 0;
    this.tabShowRecordPerPageCount = 10;
    this.tabCurrentPage = 1;
    this.searchString = "";
    this.tabListKey = [];
    this.tabData = {};
    this.deleteRecordIds = [];
    this.checkAll = "";
    this.recordRow = [];
    this.getTableData(); 
  }

  //Get relation table data
   getTableData(){
    var url = this.modelName + "?_start=" + ((this.tabCurrentPage - 1) * (this.tabShowRecordPerPageCount)) +"&_limit=" + this.tabShowRecordPerPageCount;
    console.log(this.searchString);
    if(this.searchString){
      url +=  "&_q=" + this.searchString;
    }
    this._service.getFind(url).subscribe(data => {
      var keysdata = Object.keys(data[0]);
      for(var i = 0;i<keysdata.length;i++) { 
         this.tabListKey.push(keysdata[i]); 
      }
      this.tabData = data;
      this.tabShowRecordCount = Object.keys(data).length;
      var counturl = this.modelName + "/count";
      this._service.getCount(counturl).subscribe(result => {
        var interData:any;
        interData = result;
        this.totalRecordCount = interData;
        this.totalPages = Math.ceil(this.totalRecordCount / this.tabShowRecordCount);
      });
    });
   }

   filterColumn(event, columnName, orderBystate){
     console.log(event);
   }
   //Get relation table data
   getSearchStringData(event){
    var url = this.modelName + "?&_start=" + ((this.tabCurrentPage - 1) * (this.tabShowRecordPerPageCount)) +"&_limit=" + this.tabShowRecordPerPageCount + "&_q=" + this.searchString;
    console.log(this.searchString);
    this._service.getFind(url).subscribe(data => {
      var keysdata = Object.keys(data[0]);
      for(var i = 0;i<keysdata.length;i++) { 
         this.tabListKey.push(keysdata[i]); 
      }
      this.tabData = data;

      var interData:any;
      interData = Object.keys(data).length;
      this.tabShowRecordCount = interData;

      var counturl = this.modelName + "/count";
      this._service.getCount(counturl).subscribe(result => {
        var interData:any;
        interData = result;
        this.totalRecordCount = interData;
        this.totalPages = Math.ceil(this.totalRecordCount / this.tabShowRecordCount);
      });
    });
   }

   pageNext(event) {
      this.loading = true;
      if (this.tabCurrentPage < this.totalPages) {
        this.tabCurrentPage++;
        this.getTableData();
      }
     this.loading = false; 
  }
  
  pagePrev(event) {
    this.loading = true;
    if (this.tabCurrentPage > 1) {
      this.tabCurrentPage--;
      this.getTableData();
    }
    this.loading = false;
  }

  pageChange(event){
    this.loading = true;
    if (this.tabCurrentPage < this.totalPages) {
      this.tabCurrentPage++;
      this.getTableData();
    }
    this.loading = false;
  }

  pageSizeChange(event){
    this.loading = true;
    console.log("GGGG"+ this.tabShowRecordPerPageCount);
    if (this.tabShowRecordPerPageCount > 0) {
      this.getTableData();
    }
    this.loading = false;
  }

  serachRecord(event){
    this.loading = true;
    console.log("GGGG"+ this.tabShowRecordPerPageCount);
    if (this.tabShowRecordPerPageCount > 0) {
      this.getTableData();
    }
    this.loading = false;
  }

  deleteRecord(event, rowId, targetTable)
   {
    var deleteurl = targetTable+"/"+rowId;
    this._service.getDestroy(deleteurl).subscribe(data => {
      window.location.reload();
    });
   }

   deleteMultipleRecords(event, targetTable)
   {
    var deleteurl = targetTable+"/deleteall";
    // this._service.getDestroyAll(deleteurl, this.consumerModelData).subscribe(data => {
    //   window.location.reload();
    // });
   }

   getDeleteRowIds(event, rowId){
    const arrray = {id : rowId};
     console.log(this.deleteRecordIds);
     if(!this.deleteRecordIds.some(result => result.id == rowId)){
        var interData:any;
        interData = this.deleteRecordIds;
        interData.push(arrray);
        this.deleteRecordIds = interData;
     }else{
        var interData:any;
        interData = this.deleteRecordIds;
        interData.pop(arrray);
        this.deleteRecordIds = interData;
     }
   }

   toggleCheckBoxes(event) {
    this.loading = true;
    $('.rowChecks').each(function() {
      var valuee = $(this).val();
      console.log(valuee);
      $(this).prop('checked', (($('#headCheck').prop('checked')) ? (true) : (false)));
    });
    this.loading = false;
  }

  showLargeModal() {
    const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Import Consumers';
    activeModal.componentInstance.modalContent = 'Please select your CSV file';
  }

  exportToExcel(event, jsonData, excelFileName) {
    this.excelService.exportAsExcelFile(jsonData, excelFileName);
  }
}



import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { HttpLayerService } from '../../../services/httpLayer/httpLayer.service';

@Component({
  selector: 'ngx-edit',
  styleUrls: ['./edit.component.scss'],
  templateUrl: './edit.component.html',
})

export class KitEditComponent implements OnInit {






  
  public dtUsersCL; 
  
  public totalRecordsCL;
  
  public showingRecordsCL;
  
  public lastPageCL;
  
  public dtPagesCL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  public postDataCL = {
    f: 'api_get_user_list',
    searchText: '',
    orderColumn: 'id',
    orderType: 'ASC',
    pageNo: '1',
    pageSize: '10',
  };

  dtPageSizesCL =[
    //{"text": "1", "value": "1"},
    //{"text": "3", "value": "3"},
    //{"text": "5", "value": "5"},
    {"text": "10", "value": "10"},
    {"text": "20", "value": "20"},
    {"text": "50", "value": "50"},
    {"text": "100", "value": "100"},
    {"text": "200", "value": "200"},
    {"text": "500", "value": "500"}
  ];

  constructor( private _http: HttpClient, private _service: HttpLayerService) {


	this.getChangeLogData();
	this.getDeviceData();
	this.getKYCDocumentData();
	this.getServiceData();


  }

  ngOnInit() {
  		this.getdataCL(this.postDataCL.f, this.postDataCL.searchText, this.postDataCL.orderColumn, this.postDataCL.orderType, this.postDataCL.pageNo, this.postDataCL.pageSize);


  		this.getdataDev(this.postDataDev.f, this.postDataDev.searchText, this.postDataDev.orderColumn, this.postDataDev.orderType, this.postDataDev.pageNo, this.postDataDev.pageSize);


  		this.getdataSrv(this.postDataSrv.f, this.postDataSrv.searchText, this.postDataSrv.orderColumn, this.postDataSrv.orderType, this.postDataSrv.pageNo, this.postDataSrv.pageSize);


  		this.getdataKYC(this.postDataKYC.f, this.postDataKYC.searchText, this.postDataKYC.orderColumn, this.postDataKYC.orderType, this.postDataKYC.pageNo, this.postDataKYC.pageSize);

	}

  getdataCL(f, searchText, orderColumn, orderType, pageNo, pageSize) {

    //set to global session
    if (!((f == null) || (typeof(f) == 'undefined') || ((f.toString().trim().length) <= 0))) { this.postDataCL.f = f; }
    if (!((searchText == null) || (typeof(searchText) == 'undefined') || ((searchText.toString().trim().length) < 0))) { this.postDataCL.searchText = searchText; }
    if (!((orderColumn == null) || (typeof(orderColumn) == 'undefined') || ((orderColumn.toString().trim().length) <= 0))) { this.postDataCL.orderColumn = orderColumn; }
    if (!((orderType == null) || (typeof(orderType) == 'undefined') || ((orderType.toString().trim().length) <= 0))) { this.postDataCL.orderType = orderType; }
    if (!((pageNo == null) || (typeof(pageNo) == 'undefined') || ((pageNo.toString().trim().length) <= 0))) { this.postDataCL.pageNo = pageNo; }
    if (!((pageSize == null) || (typeof(pageSize) == 'undefined') || ((pageSize.toString().trim().length) <= 0))) { this.postDataCL.pageSize = pageSize; }

    //hit Api then load into table
    this._service.hitPost("http://localhost:9090/ucare/api/api.php?f=" + this.postDataCL.f + "&searchText=" + this.postDataCL.searchText + "&orderColumn=" + this.postDataCL.orderColumn + "&orderType=" + this.postDataCL.orderType + "&pageNo=" + this.postDataCL.pageNo + "&pageSize=" + this.postDataCL.pageSize, this.postDataCL).subscribe(
      data => {
          this.dtUsersCL = data['data']['user_list'];
          this.showingRecordsCL = data['data']['user_list'].length;
          this.totalRecordsCL = data['data']['totalRecords'];
          if (this.totalRecordsCL % this.showingRecordsCL == 0)
          {
            this.lastPageCL = (this.totalRecordsCL/this.showingRecordsCL);
          }
          else
          {
            this.lastPageCL = ((this.totalRecordsCL/this.showingRecordsCL) + 1);
          }
          this.dtPagesCL = [];
          for (var i = 1; i <= this.lastPageCL; i++)
          {
            this.dtPagesCL.push(i);
          }
      }
    );
  }

  filterColumnCL(event, id) {
    this.postDataCL.pageNo = '1';
    var columnName = ($('#' + id).attr('data-columnName'));
    var columnTitle = ($('#' + id).attr('data-columnTitle'));
    var columnOrder = ($('#' + id).attr('data-order'));
    this.getdataCL(null, null, columnName, columnOrder, null, null);
    $('.thChangeIconCL').each(function(i, e) {
      $(this).attr('data-order', 'ASC');
      $(this).html((($(this).attr('data-columnTitle')) + ' <i class="ion-funnel"></i>'));
    });
    if (columnOrder == "ASC") {
      $('#' + id).html(columnTitle + ' <i class="ion-chevron-up"></i>');
      $('#' + id).attr('data-order', 'DESC');
    }
    else {
      $('#' + id).html(columnTitle + ' <i class="ion-chevron-down"></i>');
      $('#' + id).attr('data-order', 'ASC');
    }
  }
  
  pageNextCL(event) {
    if (parseInt(this.postDataCL.pageNo) < parseInt(this.lastPageCL))
    {
      this.getdataCL(null, null, null, null, (parseInt(this.postDataCL.pageNo) + 1), null);
    }
  }
  
  pagePrevCL(event) {
    if (parseInt(this.postDataCL.pageNo) > 1)
    {
      this.getdataCL(null, null, null, null, (parseInt(this.postDataCL.pageNo) - 1), null);
    }
  }

  searchValueCL(event) { this.postDataCL.pageNo = '1'; this.getdataCL(null, (event.srcElement.value), null, null, null, null); }
  
  selectPageCL(event) { this.getdataCL(null, null, null, null, (event.srcElement.value), null); }
  
  selectPageSizeCL(event) { this.postDataCL.pageNo = '1'; this.getdataCL(null, null, null, null, null, (event.srcElement.value)); }

  exportKitsCL(event) { event.preventDefault(); alert('exporting ...'); }

  importKitsCL(event) { event.preventDefault(); alert('importing...'); }






  
  public dtUsersSrv; 
  
  public totalRecordsSrv;
  
  public showingRecordsSrv;
  
  public lastPageSrv;
  
  public dtPagesSrv = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  public postDataSrv = {
    f: 'api_get_user_list',
    searchText: '',
    orderColumn: 'id',
    orderType: 'ASC',
    pageNo: '1',
    pageSize: '10',
  };

  dtPageSizesSrv =[
    //{"text": "1", "value": "1"},
    //{"text": "3", "value": "3"},
    //{"text": "5", "value": "5"},
    {"text": "10", "value": "10"},
    {"text": "20", "value": "20"},
    {"text": "50", "value": "50"},
    {"text": "100", "value": "100"},
    {"text": "200", "value": "200"},
    {"text": "500", "value": "500"}
  ];


  getdataSrv(f, searchText, orderColumn, orderType, pageNo, pageSize) {

    //set to global session
    if (!((f == null) || (typeof(f) == 'undefined') || ((f.toString().trim().length) <= 0))) { this.postDataSrv.f = f; }
    if (!((searchText == null) || (typeof(searchText) == 'undefined') || ((searchText.toString().trim().length) < 0))) { this.postDataSrv.searchText = searchText; }
    if (!((orderColumn == null) || (typeof(orderColumn) == 'undefined') || ((orderColumn.toString().trim().length) <= 0))) { this.postDataSrv.orderColumn = orderColumn; }
    if (!((orderType == null) || (typeof(orderType) == 'undefined') || ((orderType.toString().trim().length) <= 0))) { this.postDataSrv.orderType = orderType; }
    if (!((pageNo == null) || (typeof(pageNo) == 'undefined') || ((pageNo.toString().trim().length) <= 0))) { this.postDataSrv.pageNo = pageNo; }
    if (!((pageSize == null) || (typeof(pageSize) == 'undefined') || ((pageSize.toString().trim().length) <= 0))) { this.postDataSrv.pageSize = pageSize; }

    //hit Api then load into table
    this._service.hitPost("http://localhost:9090/ucare/api/api.php?f=" + this.postDataSrv.f + "&searchText=" + this.postDataSrv.searchText + "&orderColumn=" + this.postDataSrv.orderColumn + "&orderType=" + this.postDataSrv.orderType + "&pageNo=" + this.postDataSrv.pageNo + "&pageSize=" + this.postDataSrv.pageSize, this.postDataSrv).subscribe(
      data => {
          this.dtUsersSrv = data['data']['user_list'];
          this.showingRecordsSrv = data['data']['user_list'].length;
          this.totalRecordsSrv = data['data']['totalRecords'];
          if (this.totalRecordsSrv % this.showingRecordsSrv == 0)
          {
            this.lastPageSrv = (this.totalRecordsSrv/this.showingRecordsSrv);
          }
          else
          {
            this.lastPageSrv = ((this.totalRecordsSrv/this.showingRecordsSrv) + 1);
          }
          this.dtPagesSrv = [];
          for (var i = 1; i <= this.lastPageSrv; i++)
          {
            this.dtPagesSrv.push(i);
          }
      }
    );
  }

  filterColumnSrv(event, id) {
    this.postDataSrv.pageNo = '1';
    var columnName = ($('#' + id).attr('data-columnName'));
    var columnTitle = ($('#' + id).attr('data-columnTitle'));
    var columnOrder = ($('#' + id).attr('data-order'));
    this.getdataSrv(null, null, columnName, columnOrder, null, null);
    $('.thChangeIconSrv').each(function(i, e) {
      $(this).attr('data-order', 'ASC');
      $(this).html((($(this).attr('data-columnTitle')) + ' <i class="ion-funnel"></i>'));
    });
    if (columnOrder == "ASC") {
      $('#' + id).html(columnTitle + ' <i class="ion-chevron-up"></i>');
      $('#' + id).attr('data-order', 'DESC');
    }
    else {
      $('#' + id).html(columnTitle + ' <i class="ion-chevron-down"></i>');
      $('#' + id).attr('data-order', 'ASC');
    }
  }
  
  pageNextSrv(event) {
    if (parseInt(this.postDataSrv.pageNo) < parseInt(this.lastPageSrv))
    {
      this.getdataSrv(null, null, null, null, (parseInt(this.postDataSrv.pageNo) + 1), null);
    }
  }
  
  pagePrevSrv(event) {
    if (parseInt(this.postDataSrv.pageNo) > 1)
    {
      this.getdataSrv(null, null, null, null, (parseInt(this.postDataSrv.pageNo) - 1), null);
    }
  }

  searchValueSrv(event) { this.postDataSrv.pageNo = '1'; this.getdataSrv(null, (event.srcElement.value), null, null, null, null); }
  
  selectPageSrv(event) { this.getdataSrv(null, null, null, null, (event.srcElement.value), null); }
  
  selectPageSizeSrv(event) { this.postDataSrv.pageNo = '1'; this.getdataSrv(null, null, null, null, null, (event.srcElement.value)); }

  exportKitsSrv(event) { event.preventDefault(); alert('exporting ...'); }

  importKitsSrv(event) { event.preventDefault(); alert('importing...'); }

  toggleKitSrvCheckBoxes(event) {
    $('.kitSrvCheckBoxes').each(function() {
      if ($('#kitSrvHeadCheckBox').prop('checked'))
      {
        $(this).prop('checked', true);
      }
      else
      {
        $(this).prop('checked', false);
      }
    });
  }

  deleteKitSrv(event, id) { event.preventDefault(); alert('do you confirm to delete row id:' + id); }

  deleteKitsSrv(event):void {
    event.preventDefault();
    if (($('.kitSrvCheckBoxes:checked').length) > 0)
    {
      var Ids = [];
      $('.kitSrvCheckBoxes:checked').each(function(i, e){
        Ids.push(true); //(evalue);
      });
      alert('do you confirm to delete row ids:' + Ids);
    }
    else
    {
      alert('please select kit first on page, then try again...');
    }
  }






  
  public dtUsersKYC; 
  
  public totalRecordsKYC;
  
  public showingRecordsKYC;
  
  public lastPageKYC;
  
  public dtPagesKYC = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  public postDataKYC = {
    f: 'api_get_user_list',
    searchText: '',
    orderColumn: 'id',
    orderType: 'ASC',
    pageNo: '1',
    pageSize: '10',
  };

  dtPageSizesKYC =[
    //{"text": "1", "value": "1"},
    //{"text": "3", "value": "3"},
    //{"text": "5", "value": "5"},
    {"text": "10", "value": "10"},
    {"text": "20", "value": "20"},
    {"text": "50", "value": "50"},
    {"text": "100", "value": "100"},
    {"text": "200", "value": "200"},
    {"text": "500", "value": "500"}
  ];


  getdataKYC(f, searchText, orderColumn, orderType, pageNo, pageSize) {

    //set to global session
    if (!((f == null) || (typeof(f) == 'undefined') || ((f.toString().trim().length) <= 0))) { this.postDataKYC.f = f; }
    if (!((searchText == null) || (typeof(searchText) == 'undefined') || ((searchText.toString().trim().length) < 0))) { this.postDataKYC.searchText = searchText; }
    if (!((orderColumn == null) || (typeof(orderColumn) == 'undefined') || ((orderColumn.toString().trim().length) <= 0))) { this.postDataKYC.orderColumn = orderColumn; }
    if (!((orderType == null) || (typeof(orderType) == 'undefined') || ((orderType.toString().trim().length) <= 0))) { this.postDataKYC.orderType = orderType; }
    if (!((pageNo == null) || (typeof(pageNo) == 'undefined') || ((pageNo.toString().trim().length) <= 0))) { this.postDataKYC.pageNo = pageNo; }
    if (!((pageSize == null) || (typeof(pageSize) == 'undefined') || ((pageSize.toString().trim().length) <= 0))) { this.postDataKYC.pageSize = pageSize; }

    //hit Api then load into table
    this._service.hitPost("http://localhost:9090/ucare/api/api.php?f=" + this.postDataKYC.f + "&searchText=" + this.postDataKYC.searchText + "&orderColumn=" + this.postDataKYC.orderColumn + "&orderType=" + this.postDataKYC.orderType + "&pageNo=" + this.postDataKYC.pageNo + "&pageSize=" + this.postDataKYC.pageSize, this.postDataKYC).subscribe(
      data => {
          this.dtUsersKYC = data['data']['user_list'];
          this.showingRecordsKYC = data['data']['user_list'].length;
          this.totalRecordsKYC = data['data']['totalRecords'];
          if (this.totalRecordsKYC % this.showingRecordsKYC == 0)
          {
            this.lastPageKYC = (this.totalRecordsKYC/this.showingRecordsKYC);
          }
          else
          {
            this.lastPageKYC = ((this.totalRecordsKYC/this.showingRecordsKYC) + 1);
          }
          this.dtPagesKYC = [];
          for (var i = 1; i <= this.lastPageKYC; i++)
          {
            this.dtPagesKYC.push(i);
          }
      }
    );
  }

  filterColumnKYC(event, id) {
    this.postDataKYC.pageNo = '1';
    var columnName = ($('#' + id).attr('data-columnName'));
    var columnTitle = ($('#' + id).attr('data-columnTitle'));
    var columnOrder = ($('#' + id).attr('data-order'));
    this.getdataKYC(null, null, columnName, columnOrder, null, null);
    $('.thChangeIconKYC').each(function(i, e) {
      $(this).attr('data-order', 'ASC');
      $(this).html((($(this).attr('data-columnTitle')) + ' <i class="ion-funnel"></i>'));
    });
    if (columnOrder == "ASC") {
      $('#' + id).html(columnTitle + ' <i class="ion-chevron-up"></i>');
      $('#' + id).attr('data-order', 'DESC');
    }
    else {
      $('#' + id).html(columnTitle + ' <i class="ion-chevron-down"></i>');
      $('#' + id).attr('data-order', 'ASC');
    }
  }
  
  pageNextKYC(event) {
    if (parseInt(this.postDataKYC.pageNo) < parseInt(this.lastPageKYC))
    {
      this.getdataKYC(null, null, null, null, (parseInt(this.postDataKYC.pageNo) + 1), null);
    }
  }
  
  pagePrevKYC(event) {
    if (parseInt(this.postDataKYC.pageNo) > 1)
    {
      this.getdataKYC(null, null, null, null, (parseInt(this.postDataKYC.pageNo) - 1), null);
    }
  }

  searchValueKYC(event) { this.postDataKYC.pageNo = '1'; this.getdataKYC(null, (event.srcElement.value), null, null, null, null); }
  
  selectPageKYC(event) { this.getdataKYC(null, null, null, null, (event.srcElement.value), null); }
  
  selectPageSizeKYC(event) { this.postDataKYC.pageNo = '1'; this.getdataKYC(null, null, null, null, null, (event.srcElement.value)); }

  exportKitsKYC(event) { event.preventDefault(); alert('exporting ...'); }

  importKitsKYC(event) { event.preventDefault(); alert('importing...'); }

  toggleKitKYCCheckBoxes(event) {
    $('.kitKYCCheckBoxes').each(function() {
      if ($('#kitKYCHeadCheckBox').prop('checked'))
      {
        $(this).prop('checked', true);
      }
      else
      {
        $(this).prop('checked', false);
      }
    });
  }

  deleteKitKYC(event, id) { event.preventDefault(); alert('do you confirm to delete row id:' + id); }

  deleteKitsKYC(event):void {
    event.preventDefault();
    if (($('.kitKYCCheckBoxes:checked').length) > 0)
    {
      var Ids = [];
      $('.kitKYCCheckBoxes:checked').each(function(i, e){
        Ids.push(true); //(evalue);
      });
      alert('do you confirm to delete row ids:' + Ids);
    }
    else
    {
      alert('please select kit first on page, then try again...');
    }
  }






  
  public dtUsersDev; 
  
  public totalRecordsDev;
  
  public showingRecordsDev;
  
  public lastPageDev;
  
  public dtPagesDev = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  public postDataDev = {
    f: 'api_get_user_list',
    searchText: '',
    orderColumn: 'id',
    orderType: 'ASC',
    pageNo: '1',
    pageSize: '10',
  };

  dtPageSizesDev =[
    //{"text": "1", "value": "1"},
    //{"text": "3", "value": "3"},
    //{"text": "5", "value": "5"},
    {"text": "10", "value": "10"},
    {"text": "20", "value": "20"},
    {"text": "50", "value": "50"},
    {"text": "100", "value": "100"},
    {"text": "200", "value": "200"},
    {"text": "500", "value": "500"}
  ];


  getdataDev(f, searchText, orderColumn, orderType, pageNo, pageSize) {

    //set to global session
    if (!((f == null) || (typeof(f) == 'undefined') || ((f.toString().trim().length) <= 0))) { this.postDataDev.f = f; }
    if (!((searchText == null) || (typeof(searchText) == 'undefined') || ((searchText.toString().trim().length) < 0))) { this.postDataDev.searchText = searchText; }
    if (!((orderColumn == null) || (typeof(orderColumn) == 'undefined') || ((orderColumn.toString().trim().length) <= 0))) { this.postDataDev.orderColumn = orderColumn; }
    if (!((orderType == null) || (typeof(orderType) == 'undefined') || ((orderType.toString().trim().length) <= 0))) { this.postDataDev.orderType = orderType; }
    if (!((pageNo == null) || (typeof(pageNo) == 'undefined') || ((pageNo.toString().trim().length) <= 0))) { this.postDataDev.pageNo = pageNo; }
    if (!((pageSize == null) || (typeof(pageSize) == 'undefined') || ((pageSize.toString().trim().length) <= 0))) { this.postDataDev.pageSize = pageSize; }

    //hit Api then load into table
    this._service.hitPost("http://localhost:9090/ucare/api/api.php?f=" + this.postDataDev.f + "&searchText=" + this.postDataDev.searchText + "&orderColumn=" + this.postDataDev.orderColumn + "&orderType=" + this.postDataDev.orderType + "&pageNo=" + this.postDataDev.pageNo + "&pageSize=" + this.postDataDev.pageSize, this.postDataDev).subscribe(
      data => {
          this.dtUsersDev = data['data']['user_list'];
          this.showingRecordsDev = data['data']['user_list'].length;
          this.totalRecordsDev = data['data']['totalRecords'];
          if (this.totalRecordsDev % this.showingRecordsDev == 0)
          {
            this.lastPageDev = (this.totalRecordsDev/this.showingRecordsDev);
          }
          else
          {
            this.lastPageDev = ((this.totalRecordsDev/this.showingRecordsDev) + 1);
          }
          this.dtPagesDev = [];
          for (var i = 1; i <= this.lastPageDev; i++)
          {
            this.dtPagesDev.push(i);
          }
      }
    );
  }

  filterColumnDev(event, id) {
    this.postDataDev.pageNo = '1';
    var columnName = ($('#' + id).attr('data-columnName'));
    var columnTitle = ($('#' + id).attr('data-columnTitle'));
    var columnOrder = ($('#' + id).attr('data-order'));
    this.getdataDev(null, null, columnName, columnOrder, null, null);
    $('.thChangeIconDev').each(function(i, e) {
      $(this).attr('data-order', 'ASC');
      $(this).html((($(this).attr('data-columnTitle')) + ' <i class="ion-funnel"></i>'));
    });
    if (columnOrder == "ASC") {
      $('#' + id).html(columnTitle + ' <i class="ion-chevron-up"></i>');
      $('#' + id).attr('data-order', 'DESC');
    }
    else {
      $('#' + id).html(columnTitle + ' <i class="ion-chevron-down"></i>');
      $('#' + id).attr('data-order', 'ASC');
    }
  }
  
  pageNextDev(event) {
    if (parseInt(this.postDataDev.pageNo) < parseInt(this.lastPageDev))
    {
      this.getdataDev(null, null, null, null, (parseInt(this.postDataDev.pageNo) + 1), null);
    }
  }
  
  pagePrevDev(event) {
    if (parseInt(this.postDataDev.pageNo) > 1)
    {
      this.getdataDev(null, null, null, null, (parseInt(this.postDataDev.pageNo) - 1), null);
    }
  }

  searchValueDev(event) { this.postDataDev.pageNo = '1'; this.getdataDev(null, (event.srcElement.value), null, null, null, null); }
  
  selectPageDev(event) { this.getdataDev(null, null, null, null, (event.srcElement.value), null); }
  
  selectPageSizeDev(event) { this.postDataDev.pageNo = '1'; this.getdataDev(null, null, null, null, null, (event.srcElement.value)); }

  exportKitsDev(event) { event.preventDefault(); alert('exporting ...'); }

  importKitsDev(event) { event.preventDefault(); alert('importing...'); }

  toggleKitDevCheckBoxes(event) {
    $('.kitDevCheckBoxes').each(function() {
      if ($('#kitDevHeadCheckBox').prop('checked'))
      {
        $(this).prop('checked', true);
      }
      else
      {
        $(this).prop('checked', false);
      }
    });
  }

  deleteKitDev(event, id) { event.preventDefault(); alert('do you confirm to delete row id:' + id); }

  deleteKitsDev(event):void {
    event.preventDefault();
    if (($('.kitDevCheckBoxes:checked').length) > 0)
    {
      var Ids = [];
      $('.kitDevCheckBoxes:checked').each(function(i, e){
        Ids.push(true); //(evalue);
      });
      alert('do you confirm to delete row ids:' + Ids);
    }
    else
    {
      alert('please select kit first on page, then try again...');
    }
  }








	public dtChangeLog;
	public dtDevice;
	public dtKYCDocument;
	public dtService;


	getChangeLogData() {
		this._service.hitGet("https://jsonplaceholder.typicode.com/posts/1/comments").subscribe(data => {
    		this.dtChangeLog = data;
		});
	}

	getDeviceData() {
		this._service.hitGet("https://jsonplaceholder.typicode.com/posts/1/comments").subscribe(data => {
    		this.dtDevice = data;
		});
	}

	getKYCDocumentData() {
		this._service.hitGet("https://jsonplaceholder.typicode.com/posts/1/comments").subscribe(data => {
    		this.dtKYCDocument = data;
		});
	}

	getServiceData() {
		this._service.hitGet("https://jsonplaceholder.typicode.com/posts/1/comments").subscribe(data => {
    		this.dtService = data;
		});
	}

	toggleDeviceCheckBoxes(event) {
		$('.deviceCheckBoxes').each(function() {
			if ($('#deviceHeadCheckBox').prop('checked'))
			{
				$(this).prop('checked', true);
			}
			else
			{
				$(this).prop('checked', false);
			}
		});
	}

	exportDevices(event) { event.preventDefault(); alert('exporting ...'); }

	importDevices(event) { event.preventDefault(); alert('importing...'); }

	deleteDevice(event, id) { event.preventDefault(); alert('do you confirm to delete row id:' + id); }

	deleteDevices(event) {
		event.preventDefault();
		if (($('.deviceCheckBoxes:checked').length) > 0)
		{
			var Ids = [];
			$('.deviceCheckBoxes:checked').each(function(i, e) {
				Ids.push(true); //(e.value);
			});
			alert('do you confirm to delete row ids:' + Ids);
		}
		else
		{
			alert('please select kit first on page, then try again...');
		}
	}

	toggleKYCDocumentCheckBoxes(event) {
		$('.KYCDocumentCheckBoxes').each(function() {
			if ($('#KYCDocumentHeadCheckBox').prop('checked'))
			{
				$(this).prop('checked', true);
			}
			else
			{
				$(this).prop('checked', false);
			}
		});
	}

	exportKYCDocuments(event) { event.preventDefault(); alert('exporting ...'); }

	importKYCDocuments(event) { event.preventDefault(); alert('importing...'); }

	deleteKYCDocument(event, id) { event.preventDefault(); alert('do you confirm to delete row id:' + id); }

	deleteKYCDocuments(event) {
		event.preventDefault();
		if (($('.KYCDocumentCheckBoxes:checked').length) > 0)
		{
			var Ids = [];
			$('.KYCDocumentCheckBoxes:checked').each(function(i, e) {
				Ids.push(true); //(e.value);
			});
			alert('do you confirm to delete row ids:' + Ids);
		}
		else
		{
			alert('please select kit first on page, then try again...');
		}
	}

	toggleServiceCheckBoxes(event) {
		$('.serviceCheckBoxes').each(function() {
			if ($('#serviceHeadCheckBox').prop('checked'))
			{
				$(this).prop('checked', true);
			}
			else
			{
				$(this).prop('checked', false);
			}
		});
	}

	exportServices(event) { event.preventDefault(); alert('exporting ...'); }

	importServices(event) { event.preventDefault(); alert('importing...'); }

	deleteService(event, id) { event.preventDefault(); alert('do you confirm to delete row id:' + id); }

	deleteServices(event) {
		event.preventDefault();
		if (($('.serviceCheckBoxes:checked').length) > 0)
		{
			var Ids = [];
			$('.serviceCheckBoxes:checked').each(function(i, e) {
				Ids.push(true); //(e.value);
			});
			alert('do you confirm to delete row ids:' + Ids);
		}
		else
		{
			alert('please select kit first on page, then try again...');
		}
	}

	onChangeTab(event)
	{
		switch(event.tabTitle)
		{
			case 'Change Log':{
				//init DataTable
				setTimeout(function(){
					if (true) //(!($('#changeLogTable').DataTable.isDataTable()))
					{
						$('#changeLogTable').DataTable();
					}
				}, 500);
				break;
			}
			case 'Devices':{
				//init DataTable
				setTimeout(function(){
					if (true) //(!($('#deviceTable').DataTable.isDataTable()))
					{
						$('#deviceTable').DataTable();
					}
				}, 500);
				break;
			}
			case 'KYC Documents':{
				//init DataTable
				setTimeout(function(){
					if (true) //(!($('#KYCDocumentTable').DataTable.isDataTable()))
					{
						$('#KYCDocumentTable').DataTable();
					}
				}, 500);
				break;
			}
			case 'Services':{
				//init DataTable
				setTimeout(function(){
					if (true) //(!($('#serviceTable').DataTable.isDataTable()))
					{
						$('#serviceTable').DataTable();
					}
				}, 500);
				break;
			}
			default: break;
		}
	}

	kitEditForm = null;
	
	kitKYCDocumentEditForm = null;

	kitEditFormSubmit(e) { console.log(e); }

	kitKYCDocumentEditFormSubmit(e) { console.log(e); }

	approvalOfficers = [{text: 'Approval Officer - 1', value: 'approvalOfficer1'},
		{text: 'Approval Officer - 2', value: 'approvalOfficer2'},
		{text: 'Approval Officer - 3', value: 'approvalOfficer3'},
		{text: 'Approval Officer - 4', value: 'approvalOfficer4'},
		{text: 'Approval Officer - 5', value: 'approvalOfficer5'},
		{text: 'Approval Officer - 6', value: 'approvalOfficer6'},
		{text: 'Approval Officer - 7', value: 'approvalOfficer7'},
		{text: 'Approval Officer - 8', value: 'approvalOfficer8'},
		{text: 'Approval Officer - 9', value: 'approvalOfficer9'}];

	registerationOfficers = [{text: 'Registeration Officer - 1', value: 'registerationOfficer1'},
		{text: 'Registeration Officer - 2', value: 'registerationOfficer2'},
		{text: 'Registeration Officer - 3', value: 'registerationOfficer3'},
		{text: 'Registeration Officer - 4', value: 'registerationOfficer4'},
		{text: 'Registeration Officer - 5', value: 'registerationOfficer5'},
		{text: 'Registeration Officer - 6', value: 'registerationOfficer6'},
		{text: 'Registeration Officer - 7', value: 'registerationOfficer7'},
		{text: 'Registeration Officer - 8', value: 'registerationOfficer8'},
		{text: 'Registeration Officer - 9', value: 'registerationOfficer9'}];

	categories = [{text: 'Category - 1', value: 'cat1'},
		{text: 'Category - 2', value: 'cat2'},
		{text: 'Category - 3', value: 'cat3'},
		{text: 'Category - 4', value: 'cat4'},
		{text: 'Category - 5', value: 'cat5'},
		{text: 'Category - 6', value: 'cat6'},
		{text: 'Category - 7', value: 'cat7'},
		{text: 'Category - 8', value: 'cat8'},
		{text: 'Category - 9', value: 'cat9'}];

	subCategories = [{text: 'Sub Category - 1', value: 'subCategory1'},
		{text: 'Sub Category - 2', value: 'subCategory2'},
		{text: 'Sub Category - 3', value: 'subCategory3'},
		{text: 'Sub Category - 4', value: 'subCategory4'},
		{text: 'Sub Category - 5', value: 'subCategory5'},
		{text: 'Sub Category - 6', value: 'subCategory6'},
		{text: 'Sub Category - 7', value: 'subCategory7'},
		{text: 'Sub Category - 8', value: 'subCategory8'},
		{text: 'Sub Category - 9', value: 'subCategory9'}];

	entityTypes = [{text: 'Entity Type - 1', value: 'entityType1'},
		{text: 'Entity Type - 2', value: 'entityType2'},
		{text: 'Entity Type - 3', value: 'entityType3'},
		{text: 'Entity Type - 4', value: 'entityType4'},
		{text: 'Entity Type - 5', value: 'entityType5'},
		{text: 'Entity Type - 6', value: 'entityType6'},
		{text: 'Entity Type - 7', value: 'entityType7'},
		{text: 'Entity Type - 8', value: 'entityType8'},
		{text: 'Entity Type - 9', value: 'entityType9'}];

	designations = [{text: 'Designation - 1', value: 'designation1'},
		{text: 'Designation - 2', value: 'designation2'},
		{text: 'Designation - 3', value: 'designation3'},
		{text: 'Designation - 4', value: 'designation4'},
		{text: 'Designation - 5', value: 'designation5'},
		{text: 'Designation - 6', value: 'designation6'},
		{text: 'Designation - 7', value: 'designation7'},
		{text: 'Designation - 8', value: 'designation8'},
		{text: 'Designation - 9', value: 'designation9'}];

	registrationStatuses = [{text: 'Registration-Status - 1', value: 'registrationStatus1'},
		{text: 'Registration Status - 2', value: 'registrationStatus2'},
		{text: 'Registration Status - 3', value: 'registrationStatus3'},
		{text: 'Registration Status - 4', value: 'registrationStatus4'},
		{text: 'Registration Status - 5', value: 'registrationStatus5'},
		{text: 'Registration Status - 6', value: 'registrationStatus6'},
		{text: 'Registration Status - 7', value: 'registrationStatus7'},
		{text: 'Registration Status - 8', value: 'registrationStatus8'},
		{text: 'Registration Status - 9', value: 'registrationStatus9'}];

	documentTypes = [{text: 'Document-Type - 1', value: 'documentType1'},
		{text: 'Document Type - 2', value: 'documentType2'},
		{text: 'Document Type - 3', value: 'documentType3'},
		{text: 'Document Type - 4', value: 'documentType4'},
		{text: 'Document Type - 5', value: 'documentType5'},
		{text: 'Document Type - 6', value: 'documentType6'},
		{text: 'Document Type - 7', value: 'documentType7'},
		{text: 'Document Type - 8', value: 'documentType8'},
		{text: 'Document Type - 9', value: 'documentType9'}];

	states = [{text: 'State - 1', value: 'state1'},
		{text: 'State - 2', value: 'state2'},
		{text: 'State - 3', value: 'state3'},
		{text: 'State - 4', value: 'state4'},
		{text: 'State - 5', value: 'state5'},
		{text: 'State - 6', value: 'state6'},
		{text: 'State - 7', value: 'state7'},
		{text: 'State - 8', value: 'state8'},
		{text: 'State - 9', value: 'state9'}];

	countries = [{text: 'Country - 1', value: 'country1'},
		{text: 'Country - 2', value: 'country2'},
		{text: 'Country - 3', value: 'country3'},
		{text: 'Country - 4', value: 'country4'},
		{text: 'Country - 5', value: 'country5'},
		{text: 'Country - 6', value: 'country6'},
		{text: 'Country - 7', value: 'country7'},
		{text: 'Country - 8', value: 'country8'},
		{text: 'Country - 9', value: 'country9'}];

	accountTypes = [{text: 'Account Type - 1', value: 'accountType1'},
		{text: 'Account Type - 2', value: 'accountType2'},
		{text: 'Account Type - 3', value: 'accountType3'},
		{text: 'Account Type - 4', value: 'accountType4'},
		{text: 'Account Type - 5', value: 'accountType5'},
		{text: 'Account Type - 6', value: 'accountType6'},
		{text: 'Account Type - 7', value: 'accountType7'},
		{text: 'Account Type - 8', value: 'accountType8'},
		{text: 'Account Type - 9', value: 'accountType9'}];

	preferedPaymentMethods = [{text: 'Prefered Payment Method - 1', value: 'preferedPaymentMethod1'},
		{text: 'Prefered Payment Method - 2', value: 'preferedPaymentMethod2'},
		{text: 'Prefered Payment Method - 3', value: 'preferedPaymentMethod3'},
		{text: 'Prefered Payment Method - 4', value: 'preferedPaymentMethod4'},
		{text: 'Prefered Payment Method - 5', value: 'preferedPaymentMethod5'},
		{text: 'Prefered Payment Method - 6', value: 'preferedPaymentMethod6'},
		{text: 'Prefered Payment Method - 7', value: 'preferedPaymentMethod7'},
		{text: 'Prefered Payment Method - 8', value: 'preferedPaymentMethod8'},
		{text: 'Prefered Payment Method - 9', value: 'preferedPaymentMethod9'}];

	constitutionOfBusinesses = [{text: 'Constitution Of Business - 1', value: 'constitutionOfBusiness1'},
		{text: 'Constitution Of Business - 2', value: 'constitutionOfBusiness2'},
		{text: 'Constitution Of Business - 3', value: 'constitutionOfBusiness3'},
		{text: 'Constitution Of Business - 4', value: 'constitutionOfBusiness4'},
		{text: 'Constitution Of Business - 5', value: 'constitutionOfBusiness5'},
		{text: 'Constitution Of Business - 6', value: 'constitutionOfBusiness6'},
		{text: 'Constitution Of Business - 7', value: 'constitutionOfBusiness7'},
		{text: 'Constitution Of Business - 8', value: 'constitutionOfBusiness8'},
		{text: 'Constitution Of Business - 9', value: 'constitutionOfBusiness9'}];

	msmeStatuses = [{text: 'MSME Status - 1', value: 'msmeStatus1'},
		{text: 'MSME Status - 2', value: 'msmeStatus2'},
		{text: 'MSME Status - 3', value: 'msmeStatus3'},
		{text: 'MSME Status - 4', value: 'msmeStatus4'},
		{text: 'MSME Status - 5', value: 'msmeStatus5'},
		{text: 'MSME Status - 6', value: 'msmeStatus6'},
		{text: 'MSME Status - 7', value: 'msmeStatus7'},
		{text: 'MSME Status - 8', value: 'msmeStatus8'},
		{text: 'MSME Status - 9', value: 'msmeStatus9'}];

	paymentTerms = [{text: 'Payment Term - 1', value: 'paymentTerm1'},
		{text: 'Payment Term - 2', value: 'paymentTerm2'},
		{text: 'Payment Term - 3', value: 'paymentTerm3'},
		{text: 'Payment Term - 4', value: 'paymentTerm4'},
		{text: 'Payment Term - 5', value: 'paymentTerm5'},
		{text: 'Payment Term - 6', value: 'paymentTerm6'},
		{text: 'Payment Term - 7', value: 'paymentTerm7'},
		{text: 'Payment Term - 8', value: 'paymentTerm8'},
		{text: 'Payment Term - 9', value: 'paymentTerm9'}];

	gstRegistrationStatuses = [{text: 'GST Registration Status - 1', value: 'gstRegistrationStatus1'},
		{text: 'GST Registration Status - 2', value: 'gstRegistrationStatus2'},
		{text: 'GST Registration Status - 3', value: 'gstRegistrationStatus3'},
		{text: 'GST Registration Status - 4', value: 'gstRegistrationStatus4'},
		{text: 'GST Registration Status - 5', value: 'gstRegistrationStatus5'},
		{text: 'GST Registration Status - 6', value: 'gstRegistrationStatus6'},
		{text: 'GST Registration Status - 7', value: 'gstRegistrationStatus7'},
		{text: 'GST Registration Status - 8', value: 'gstRegistrationStatus8'},
		{text: 'GST Registration Status - 9', value: 'gstRegistrationStatus9'}];

}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { HttpLayerService } from '../../../services/httpLayer/httpLayer.service';

@Component({
  selector: 'ngx-edit',
  styleUrls: ['./edit.component.scss'],
  templateUrl: './edit.component.html',
})

export class DeviceEditComponent implements OnInit {

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

  }

  ngOnInit() {
  		this.getdataCL(this.postDataCL.f, this.postDataCL.searchText, this.postDataCL.orderColumn, this.postDataCL.orderType, this.postDataCL.pageNo, this.postDataCL.pageSize);
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

  exportDevicesCL(event) { event.preventDefault(); alert('exporting ...'); }

  importDevicesCL(event) { event.preventDefault(); alert('importing...'); }

  public dtChangeLog;


	getChangeLogData() {
		this._service.hitGet("https://jsonplaceholder.typicode.com/posts/1/comments").subscribe(data => {
    		this.dtChangeLog = data;
		});
	}

	onChangeTab(event)
	{ }

	deviceEditForm = null;

  deviceEditFormSubmit(e) { console.log(e); }

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

  deviceTypes = [{text: 'Device Type - 1', value: 'deviceType1'},
    {text: 'Device Type - 2', value: 'deviceType2'},
    {text: 'Device Type - 3', value: 'deviceType3'},
    {text: 'Device Type - 4', value: 'deviceType4'},
    {text: 'Device Type - 5', value: 'deviceType5'},
    {text: 'Device Type - 6', value: 'deviceType6'},
    {text: 'Device Type - 7', value: 'deviceType7'},
    {text: 'Device Type - 8', value: 'deviceType8'},
    {text: 'Device Type - 9', value: 'deviceType9'}];

  deviceActives = [{text: 'Device is Active - 1', value: 'deviceActive1'},
    {text: 'Device is Active - 2', value: 'deviceActive2'},
    {text: 'Device is Active - 3', value: 'deviceActive3'},
    {text: 'Device is Active - 4', value: 'deviceActive4'},
    {text: 'Device is Active - 5', value: 'deviceActive5'},
    {text: 'Device is Active - 6', value: 'deviceActive6'},
    {text: 'Device is Active - 7', value: 'deviceActive7'},
    {text: 'Device is Active - 8', value: 'deviceActive8'},
    {text: 'Device is Active - 9', value: 'deviceActive9'}];

  deviceProviders = [{text: 'Device Provider - 1', value: 'deviceProvider1'},
    {text: 'Device Provider - 2', value: 'deviceProvider2'},
    {text: 'Device Provider - 3', value: 'deviceProvider3'},
    {text: 'Device Provider - 4', value: 'deviceProvider4'},
    {text: 'Device Provider - 5', value: 'deviceProvider5'},
    {text: 'Device Provider - 6', value: 'deviceProvider6'},
    {text: 'Device Provider - 7', value: 'deviceProvider7'},
    {text: 'Device Provider - 8', value: 'deviceProvider8'},
    {text: 'Device Provider - 9', value: 'deviceProvider9'}];

}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { HttpLayerService } from '../../../services/httpLayer/httpLayer.service';

@Component({
  selector: 'ngx-inventory',
  //styleUrls: ['./inventory.component.scss'],
  templateUrl: './inventory.component.html',
})

export class ServiceInventoryComponent implements OnInit {
  
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
  this.getInventoryData();

  }

  ngOnInit() {
      this.getdataCL(this.postDataCL.f, this.postDataCL.searchText, this.postDataCL.orderColumn, this.postDataCL.orderType, this.postDataCL.pageNo, this.postDataCL.pageSize);


      this.getdataInv(this.postDataInv.f, this.postDataInv.searchText, this.postDataInv.orderColumn, this.postDataInv.orderType, this.postDataInv.pageNo, this.postDataInv.pageSize);

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

  exportInventoriesCL(event) { event.preventDefault(); alert('exporting ...'); }

  importInventoriesCL(event) { event.preventDefault(); alert('importing...'); }


  
  public dtUsersInv; 
  
  public totalRecordsInv;
  
  public showingRecordsInv;
  
  public lastPageInv;
  
  public dtPagesInv = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  public postDataInv = {
    f: 'api_get_user_list',
    searchText: '',
    orderColumn: 'id',
    orderType: 'ASC',
    pageNo: '1',
    pageSize: '10',
  };

  dtPageSizesInv =[
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


  getdataInv(f, searchText, orderColumn, orderType, pageNo, pageSize) {

    //set to global session
    if (!((f == null) || (typeof(f) == 'undefined') || ((f.toString().trim().length) <= 0))) { this.postDataInv.f = f; }
    if (!((searchText == null) || (typeof(searchText) == 'undefined') || ((searchText.toString().trim().length) < 0))) { this.postDataInv.searchText = searchText; }
    if (!((orderColumn == null) || (typeof(orderColumn) == 'undefined') || ((orderColumn.toString().trim().length) <= 0))) { this.postDataInv.orderColumn = orderColumn; }
    if (!((orderType == null) || (typeof(orderType) == 'undefined') || ((orderType.toString().trim().length) <= 0))) { this.postDataInv.orderType = orderType; }
    if (!((pageNo == null) || (typeof(pageNo) == 'undefined') || ((pageNo.toString().trim().length) <= 0))) { this.postDataInv.pageNo = pageNo; }
    if (!((pageSize == null) || (typeof(pageSize) == 'undefined') || ((pageSize.toString().trim().length) <= 0))) { this.postDataInv.pageSize = pageSize; }

    //hit Api then load into table
    this._service.hitPost("http://localhost:9090/ucare/api/api.php?f=" + this.postDataInv.f + "&searchText=" + this.postDataInv.searchText + "&orderColumn=" + this.postDataInv.orderColumn + "&orderType=" + this.postDataInv.orderType + "&pageNo=" + this.postDataInv.pageNo + "&pageSize=" + this.postDataInv.pageSize, this.postDataInv).subscribe(
      data => {
          this.dtUsersInv = data['data']['user_list'];
          this.showingRecordsInv = data['data']['user_list'].length;
          this.totalRecordsInv = data['data']['totalRecords'];
          if (this.totalRecordsInv % this.showingRecordsInv == 0)
          {
            this.lastPageInv = (this.totalRecordsInv/this.showingRecordsInv);
          }
          else
          {
            this.lastPageInv = ((this.totalRecordsInv/this.showingRecordsInv) + 1);
          }
          this.dtPagesInv = [];
          for (var i = 1; i <= this.lastPageInv; i++)
          {
            this.dtPagesInv.push(i);
          }
      }
    );
  }

  filterColumnInv(event, id) {
    this.postDataInv.pageNo = '1';
    var columnName = ($('#' + id).attr('data-columnName'));
    var columnTitle = ($('#' + id).attr('data-columnTitle'));
    var columnOrder = ($('#' + id).attr('data-order'));
    this.getdataInv(null, null, columnName, columnOrder, null, null);
    $('.thChangeIconInv').each(function(i, e) {
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
  
  pageNextInv(event) {
    if (parseInt(this.postDataInv.pageNo) < parseInt(this.lastPageInv))
    {
      this.getdataInv(null, null, null, null, (parseInt(this.postDataInv.pageNo) + 1), null);
    }
  }
  
  pagePrevInv(event) {
    if (parseInt(this.postDataInv.pageNo) > 1)
    {
      this.getdataInv(null, null, null, null, (parseInt(this.postDataInv.pageNo) - 1), null);
    }
  }

  searchValueInv(event) { this.postDataInv.pageNo = '1'; this.getdataInv(null, (event.srcElement.value), null, null, null, null); }
  
  selectPageInv(event) { this.getdataInv(null, null, null, null, (event.srcElement.value), null); }
  
  selectPageSizeInv(event) { this.postDataInv.pageNo = '1'; this.getdataInv(null, null, null, null, null, (event.srcElement.value)); }

  exportServicesInv(event) { event.preventDefault(); alert('exporting ...'); }

  importServicesInv(event) { event.preventDefault(); alert('importing...'); }

  toggleServiceInvCheckBoxes(event) {
    $('.serviceInvCheckBoxes').each(function() {
      if ($('#serviceInvHeadCheckBox').prop('checked'))
      {
        $(this).prop('checked', true);
      }
      else
      {
        $(this).prop('checked', false);
      }
    });
  }

  deleteServiceInv(event, id) { event.preventDefault(); alert('do you confirm to delete row id:' + id); }

  deleteServicesInv(event):void {
    event.preventDefault();
    if (($('.serviceInvCheckBoxes:checked').length) > 0)
    {
      var Ids = [];
      $('.serviceInvCheckBoxes:checked').each(function(i, e){
        Ids.push(true); //(evalue);
      });
      alert('do you confirm to delete row ids:' + Ids);
    }
    else
    {
      alert('please select inventory first on page, then try again...');
    }
  }








  public dtChangeLog;
  public dtInventory;


  getChangeLogData() {
    this._service.hitGet("https://jsonplaceholder.typicode.com/posts/1/comments").subscribe(data => {
        this.dtChangeLog = data;
    });
  }

  getInventoryData() {
    this._service.hitGet("https://jsonplaceholder.typicode.com/posts/1/comments").subscribe(data => {
        this.dtInventory = data;
    });
  }

  toggleInventoryCheckBoxes(event) {
    $('.inventoryCheckBoxes').each(function() {
      if ($('#inventoryHeadCheckBox').prop('checked'))
      {
        $(this).prop('checked', true);
      }
      else
      {
        $(this).prop('checked', false);
      }
    });
  }

  exportInventories(event) { event.preventDefault(); alert('exporting ...'); }

  importInventories(event) { event.preventDefault(); alert('importing...'); }

  deleteInventory(event, id) { event.preventDefault(); alert('do you confirm to delete row id:' + id); }

  deleteInventories(event) {
    event.preventDefault();
    if (($('.inventoryCheckBoxes:checked').length) > 0)
    {
      var Ids = [];
      $('.inventoryCheckBoxes:checked').each(function(i, e) {
        Ids.push(true); //(e.value);
      });
      alert('do you confirm to delete row ids:' + Ids);
    }
    else
    {
      alert('please select inventory first on page, then try again...');
    }
  }

  onChangeTab(event) { }

}

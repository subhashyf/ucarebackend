import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { HttpLayerService } from '../../../services/httpLayer/httpLayer.service';

@Component({
  selector: 'ngx-report',
  templateUrl: './report.component.html',
})
export class DeviceReportComponent implements OnInit {
  
  public dtUsers; 
  
  public totalRecords;
  
  public showingRecords;
  
  public lastPage;
  
  public dtPages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  public postData = {
    f: 'api_get_user_list',
    searchText: '',
    orderColumn: 'id',
    orderType: 'ASC',
    pageNo: '1',
    pageSize: '10',
  };

  dtPageSizes =[
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

  constructor( private _http: HttpClient, private _service: HttpLayerService) { }
  ngOnInit() { this.getdata(this.postData.f, this.postData.searchText, this.postData.orderColumn, this.postData.orderType, this.postData.pageNo, this.postData.pageSize); }

  getdata(f, searchText, orderColumn, orderType, pageNo, pageSize) {

    //set to global session
    if (!((f == null) || (typeof(f) == 'undefined') || ((f.toString().trim().length) <= 0))) { this.postData.f = f; }
    if (!((searchText == null) || (typeof(searchText) == 'undefined') || ((searchText.toString().trim().length) < 0))) { this.postData.searchText = searchText; }
    if (!((orderColumn == null) || (typeof(orderColumn) == 'undefined') || ((orderColumn.toString().trim().length) <= 0))) { this.postData.orderColumn = orderColumn; }
    if (!((orderType == null) || (typeof(orderType) == 'undefined') || ((orderType.toString().trim().length) <= 0))) { this.postData.orderType = orderType; }
    if (!((pageNo == null) || (typeof(pageNo) == 'undefined') || ((pageNo.toString().trim().length) <= 0))) { this.postData.pageNo = pageNo; }
    if (!((pageSize == null) || (typeof(pageSize) == 'undefined') || ((pageSize.toString().trim().length) <= 0))) { this.postData.pageSize = pageSize; }

    //hit Api then load into table
    this._service.hitPost("http://localhost:9090/ucare/api/api.php?f=" + this.postData.f + "&searchText=" + this.postData.searchText + "&orderColumn=" + this.postData.orderColumn + "&orderType=" + this.postData.orderType + "&pageNo=" + this.postData.pageNo + "&pageSize=" + this.postData.pageSize, this.postData).subscribe(
      data => {
          this.dtUsers = data['data']['user_list'];
          this.showingRecords = data['data']['user_list'].length;
          this.totalRecords = data['data']['totalRecords'];
          if (this.totalRecords % this.showingRecords == 0)
          {
            this.lastPage = (this.totalRecords/this.showingRecords);
          }
          else
          {
            this.lastPage = ((this.totalRecords/this.showingRecords) + 1);
          }
          this.dtPages = [];
          for (var i = 1; i <= this.lastPage; i++)
          {
            this.dtPages.push(i);
          }
      }
    );
  }

  filterColumn(event, id) {
    this.postData.pageNo = '1';
    var columnName = ($('#' + id).attr('data-columnName'));
    var columnTitle = ($('#' + id).attr('data-columnTitle'));
    var columnOrder = ($('#' + id).attr('data-order'));
    this.getdata(null, null, columnName, columnOrder, null, null);
    $('.thChangeIcon').each(function(i, e) {
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
  
  pageNext(event) {
    if (parseInt(this.postData.pageNo) < parseInt(this.lastPage))
    {
      this.getdata(null, null, null, null, (parseInt(this.postData.pageNo) + 1), null);
    }
  }
  
  pagePrev(event) {
    if (parseInt(this.postData.pageNo) > 1)
    {
      this.getdata(null, null, null, null, (parseInt(this.postData.pageNo) - 1), null);
    }
  }

  searchValue(event) { this.postData.pageNo = '1'; this.getdata(null, (event.srcElement.value), null, null, null, null); }
  
  selectPage(event) { this.getdata(null, null, null, null, (event.srcElement.value), null); }
  
  selectPageSize(event) { this.postData.pageNo = '1'; this.getdata(null, null, null, null, null, (event.srcElement.value)); }

  exportDevices(event) { event.preventDefault(); alert('exporting ...'); }

  importDevices(event) { event.preventDefault(); alert('importing...'); }
  
}

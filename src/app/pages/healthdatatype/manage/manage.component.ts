import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { HttpLayerService } from '../../../services/httpLayer/httpLayer.service';

@Component({
  selector: 'ngx-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class HealthDataTypeManageComponent  implements OnInit {
  
  public dtUsers; 
  
  public totalRecords;
  
  public showingRecords;
  
  public lastPage;
  
  public dtPages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  public postData = {
    f: 'api_get_custom_list',
    tableName: 'tb_health_data_type_master',
    colNames: 'id, HDTCategory, HDTDescription, HDTName, HDTSubCategory, created_at, updated_at',
    searchText: '',
    orderColumn: 'id',
    orderType: 'ASC',
    pageNo: '1',
    pageSize: '10',
  };

  dtPageSizes =[
    {"text": "1", "value": "1"},
    {"text": "3", "value": "3"},
    {"text": "5", "value": "5"},
    {"text": "10", "value": "10"},
    {"text": "20", "value": "20"},
    {"text": "50", "value": "50"},
    {"text": "100", "value": "100"},
    {"text": "200", "value": "200"},
    {"text": "500", "value": "500"}
  ];

  constructor( private _http: HttpClient, private _service: HttpLayerService) { }
  ngOnInit() { this.getdata(this.postData.f, this.postData.tableName, this.postData.colNames, this.postData.searchText, this.postData.orderColumn, this.postData.orderType, this.postData.pageNo, this.postData.pageSize); }

  getdata(f, tableName, colNames, searchText, orderColumn, orderType, pageNo, pageSize) {
    this.clearAllCheckBoxes();
    this._service.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'json', //'application/x-www-form-urlencoded',
      })
    }

    //set to global session
    if (!((f == null) || (typeof(f) == 'undefined') || ((f.toString().trim().length) <= 0))) { this.postData.f = f; }
    if (!((tableName == null) || (typeof(tableName) == 'undefined') || ((tableName.toString().trim().length) <= 0))) { this.postData.tableName = tableName; }
    if (!((colNames == null) || (typeof(colNames) == 'undefined') || ((colNames.toString().trim().length) <= 0))) { this.postData.colNames = colNames; }
    if (!((searchText == null) || (typeof(searchText) == 'undefined') || ((searchText.toString().trim().length) < 0))) { this.postData.searchText = searchText; }
    if (!((orderColumn == null) || (typeof(orderColumn) == 'undefined') || ((orderColumn.toString().trim().length) <= 0))) { this.postData.orderColumn = orderColumn; }
    if (!((orderType == null) || (typeof(orderType) == 'undefined') || ((orderType.toString().trim().length) <= 0))) { this.postData.orderType = orderType; }
    if (!((pageNo == null) || (typeof(pageNo) == 'undefined') || ((pageNo.toString().trim().length) <= 0))) { this.postData.pageNo = pageNo; }
    if (!((pageSize == null) || (typeof(pageSize) == 'undefined') || ((pageSize.toString().trim().length) <= 0))) { this.postData.pageSize = pageSize; }

    //hit Api then load into table
    this._service.hitPost("http://localhost:9090/ucare/api/api.php", this.postData).subscribe(
      data => {
          if (data['status'] == true)
          {
            this.dtUsers = data['data']['data_list'];
            if (typeof(data['data']['data_list'].length) == 'undefined')
            {
              this.showingRecords = 0;
            }
            else
            {
              this.showingRecords = (data['data']['data_list'].length);
            }
            
            this.totalRecords = data['data']['totalRecords'];
            if (this.totalRecords % parseInt(this.postData.pageSize) == 0)
            {
              this.lastPage = (this.totalRecords/parseInt(this.postData.pageSize));
            }
            else
            {
              this.lastPage = ((this.totalRecords/parseInt(this.postData.pageSize)) + 1);
            }
            this.dtPages = [];
            for (var i = 1; i <= this.lastPage; i++)
            {
              this.dtPages.push(i);
            }

          }
          else
          {
            this.dtUsers = null;
            this.totalRecords = 0;
            this.showingRecords = 0;
            this.lastPage = 0;
            this.dtPages = [];
          }
      }
    );
  }

  toggleHealthDataTypeCheckBoxes(event) {
    $('.healthdatatypeCheckBoxes').each(function() {
      if ($('#healthdatatypeHeadCheckBox').prop('checked'))
      {
        $(this).prop('checked', true);
      }
      else
      {
        $(this).prop('checked', false);
      }
    });
  }

  filterColumn(event, id) {
    this.postData.pageNo = '1';
    var columnName = ($('#' + id).attr('data-columnName'));
    var columnTitle = ($('#' + id).attr('data-columnTitle'));
    var columnOrder = ($('#' + id).attr('data-order'));
    this.getdata(null, null, null, null, columnName, columnOrder, null, null);
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
      this.getdata(null, null, null, null, null, null, (parseInt(this.postData.pageNo) + 1), null);
    }
  }
  
  pagePrev(event) {
    if (parseInt(this.postData.pageNo) > 1)
    {
      this.getdata(null, null, null, null, null, null, (parseInt(this.postData.pageNo) - 1), null);
    }
  }

  searchValue(event) { this.postData.pageNo = '1'; this.getdata(null, null, null, (event.srcElement.value), null, null, null, null); }
  
  selectPage(event) { this.getdata(null, null, null, null, null, null, (event.srcElement.value), null); }
  
  selectPageSize(event) { this.postData.pageNo = '1'; this.getdata(null, null, null, null, null, null, null, (event.srcElement.value)); }

  exportHealthDataTypes(event) { event.preventDefault(); alert('exporting ...'); }

  importHealthDataTypes(event) { event.preventDefault(); alert('importing...'); }

  deleteHealthDataType(event, id) {
    event.preventDefault();
    if (confirm('Are you sure you want to remove it permanently ?'))
    {
      this._service.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        })
      }
      var formData1 = { f: 'api_custom_delete', tableName: 'tb_health_data_type_master', id: id };
      this._service.hitPost("http://localhost:9090/ucare/api/api.php", formData1).subscribe(data => {        
        if (data['status'] == true)
        {
          this.postData.pageNo = '1'; 
          this.getdata(this.postData.f, this.postData.tableName, this.postData.colNames, this.postData.searchText, this.postData.orderColumn, this.postData.orderType, this.postData.pageNo, this.postData.pageSize);
        }
        else
        {
          alert(data['message']);
        }
      });
    }
  }

  clearAllCheckBoxes() {
    $('#healthdatatypeHeadCheckBox').prop('checked', false);
    $('.tdCheckBoxes').each(function (i, e) {
      $(this).prop('checked', false);
    });
  }

  deleteHealthDataTypes(event) {
    var Ids = [];
    if (($('.healthdatatypeCheckBoxes:checked').length) > 0)
    {
      this._service.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        })
      }

      $('.healthdatatypeCheckBoxes:checked').each(function(i, e) {
        Ids.push(e['value']);
      });

      if (confirm('Are you sure you want to remove ' + Ids["length"] + ' reccord(s) permanently ?'))
      {
        for (var itr = 0; itr < Ids.length; itr++)
        {
          var formData1 = { f: 'api_custom_delete', tableName: 'tb_health_data_type_master', id: Ids[itr] };
          this._service.hitPost("http://localhost:9090/ucare/api/api.php", formData1).subscribe(data => {        
            if (data['status'] == true)
            {
              this.postData.pageNo = '1'; 
              this.getdata(this.postData.f, this.postData.tableName, this.postData.colNames, this.postData.searchText, this.postData.orderColumn, this.postData.orderType, this.postData.pageNo, this.postData.pageSize);
            }
            else
            {
              alert(data['message']);
            }
          });
        }
      }
      this.clearAllCheckBoxes();
    }
    else
    {
      alert('please select healthdatatype first on page, then try again...');
    }
  }

  
}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { ApiService } from '../../../services/helper/api.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
selector: 'ngx-manage',
  styleUrls: ['./manage.component.scss'],
  templateUrl: './manage.component.html',
})

export class CustomerManageComponent implements OnInit {

  public loading;
  
  public dtCustomers;
  
  public totalRecords;
  
  public showingRecords;
  
  public lastPage;

  public userEnv;

  public tokenEnv;

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
  
  public dtPages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  public getFormData = {
    'modelUrl': 'customers',
    'searchText': '',
    'orderColumn': 'id',
    'orderType': 'DESC',
    'pageNo': 1,
    'pageSize': 5,
  };

  constructor(private _http: HttpClient, private _service: ApiService, private _router: Router) { }

  ngOnInit() { this.refreshThisPage(); }

  refreshThisPage() {
    this.getData();    
  }

  toggleCheckBoxes(event) {
    this.loading = true;
    $('.rowChecks').each(function() {
      $(this).prop('checked', (($('#headCheck').prop('checked')) ? (true) : (false)));
    });
    this.loading = false;
  }

  getData() {
    this.loading = true;
    var hitUrl = this.getFormData['modelUrl'];
    hitUrl += "?status_ne=Deleted&_sort=" + (this.getFormData['orderColumn']) + ":" + (this.getFormData['orderType']) + "&_start=" + ((this.getFormData['pageNo'] - 1) * (this.getFormData['pageSize'])) + "&_limit=" + (this.getFormData['pageSize']);
    this._service.getFind(hitUrl).subscribe(data => {
      this.dtCustomers = data;
      this.showingRecords = this.dtCustomers.length;
      for (var i = 0; i < this.dtCustomers.length; i++)
      {
        if (!((this.dtCustomers[i]['userId']['dateOfBirth'] == null) || (typeof(this.dtCustomers[i]['userId']['dateOfBirth']) == 'undefined')))
        {
          this.dtCustomers[i]['userId']['dateOfBirth2'] = new Date(this.dtCustomers[i]['userId']['dateOfBirth'].toString().split('T')[0]).toString().substring(3, 15);
        }
      }

      hitUrl = this.getFormData['modelUrl'] + "/count?status_ne=Deleted";
      this._service.getCount(hitUrl).subscribe(data => {
        this.totalRecords = parseFloat(data == null ? "0" : data.toString());
        this.lastPage = parseInt((this.totalRecords % this.showingRecords == 0) ? (this.totalRecords/this.showingRecords).toString() : ((this.totalRecords/this.showingRecords) + 1).toString());
        this.dtPages = [];
        for (var i = 1; i <= this.lastPage; i++) this.dtPages.push(i);
        this.loading = false;
      });

    });

  }

  deleteData(id) {
    this.loading = true;
    var hitUrl = this.getFormData['modelUrl'] + "/" + id;
    this._service.getUpdate(hitUrl, { status : 'Deleted' }).subscribe(data => {
      this.getData();
    });
  }

  filterColumn(event, id) {
    this.loading = true;
    var columnTitle = ($('#' + id).attr('data-columnTitle'));
    var orderType = ($('#' + id).attr('data-order').toString().toUpperCase());
    this.getFormData['orderColumn'] = ($('#' + id).attr('data-columnName'));
    this.getFormData['orderType'] = orderType;
    this.getFormData['pageNo'] = 1;
    $('.thChangeIcon').each(function(i, e) {
      $(this).attr('data-order', 'ASC');
      $(this).html((($(this).attr('data-columnTitle')) + ' <i class="ion-funnel"></i>'));
    });
    this.getData();
    if (orderType == 'ASC')
    {
      $('#' + id).attr('data-order', 'DESC');
      $('#' + id).html(columnTitle + ' <i class="ion-chevron-up"></i>');
    }
    else
    {
      $('#' + id).attr('data-order', 'ASC');
      $('#' + id).html(columnTitle + ' <i class="ion-chevron-down"></i>');
    }
  }
  
  pageNext(event) {
    this.loading = true;
    if (parseInt(this.getFormData['pageNo'].toString()) < parseInt(this.lastPage)) this.getFormData['pageNo'] = (parseInt(this.getFormData['pageNo'].toString()) + 1);
    this.getData();
  }
  
  pagePrev(event) {
    this.loading = true;
    if (parseInt(this.getFormData['pageNo'].toString()) > 1) this.getFormData['pageNo'] = (parseInt(this.getFormData['pageNo'].toString()) - 1);
    this.getData();
  }

  //searchValue(event) { this.loading = true; this.getFormData['pageNo'] = 1; this.getData(null, (event.srcElement.value), null, null, null, null); }
  
  selectPage(event) { this.loading = true; this.getFormData['pageNo'] = parseInt(event.srcElement.value.toString()); this.getData(); }
  
  selectPageSize(event) { this.loading = true; this.getFormData['pageNo'] = 1; this.getFormData['pageSize'] = parseInt(event.srcElement.value.toString()); this.getData(); }
 
  exportCustomers(event) { event.preventDefault(); this.loading = true; alert('exporting ...'); this.loading = false; }

  importCustomers(event) { event.preventDefault(); this.loading = true; alert('importing...'); this.loading = false; }

  deleteCustomer(event, id) { event.preventDefault(); this.loading = true; if (confirm('are you sure ?')) this.deleteData(id); this.loading = false; }

  deleteCustomers(event) {
    event.preventDefault();
    this.loading = true;
    if (($('.rowChecks:checked').length) > 0)
    {
      var Ids = [];
      $('.rowChecks:checked').each(function(i, e){ Ids.push($(this).attr('value')); });
      if (confirm('do you confirm to delete row ids:' + Ids)) for (var i = 0; i < Ids.length; i++) this.deleteData(Ids[i]);
      $('#headCheck').prop('checked', false);
      this.toggleCheckBoxes(null);
    }
    else
    {
      alert('please select customer first on page, then try again...');
      this.loading = false;
    }
  }

}

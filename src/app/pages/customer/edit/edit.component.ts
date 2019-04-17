import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { ApiService } from '../../../services/helper/api.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'ngx-edit',
  styleUrls: ['./edit.component.scss'],
  templateUrl: './edit.component.html',
})

export class CustomerEditComponent implements OnInit {

public customerModelName = 'customers';
public customerId = null;
public loading;
public customerEdit = {};

  goBackScript(event)
  {
    event.preventDefault();
    this.loading = true;
    window.history.back();
  }

  customerFormSubmit(e) {
    this.loading = true;
    this.updateData(this.customerEdit);
  }

  updateData(form) {
    this.loading = true;
    var hitUrl = this.customerModelName + '/' + this.customerId;
    this._service.getUpdate(hitUrl, form).subscribe(data => {
      console.log(data);
      window.location.href = '/#/pages/customer/manage';
    });
  }

  getData() {
    var hitUrl = this.customerModelName + '/' + this.customerId;
    this._service.getFind(hitUrl).subscribe(data => {
      this.customerEdit = data;
      this.loading = false;
    });    
  }

  constructor( private _http: HttpClient, private _service: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.loading = true;

  this.route.params.subscribe(params => {
    this.customerId = (params['id']);
    this.getData();
  });

  }

  onChangeTab(event)
  {
    this.loading = true;
    switch(event.tabTitle)
    {
      case 'Consumer':{
        this.getConsumerData();
        break;
      }
      case 'Transaction':{
        this.getTransactionData();
        break;
      }
      case 'Billing Address':{
        this.getBillingAddressData();
        break;
      }
      case 'Shipping Address':{
        //this.getShppingAddressData();
        break;
      }
      case 'KYC Document':{
        this.getKycDocumentData();
        break;
      }
      default: break;
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



  //K Y C - D O C U M E N T - T A B


  public kycDocumentModelName = 'customerkycdocuments';

  public kycDocumentList;
  
  public totalKycDocumentRecords;
  
  public showingKycDocumentRecords;
  
  public lastKycDocumentPage;
  
  public kycDocumentPages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  public getKycDocumentFormData = {
    'searchText': '',
    'orderColumn': 'id',
    'orderType': 'DESC',
    'pageNo': 1,
    'pageSize': 5,
  };

  getKycDocumentData() {
    var hitUrl = this.kycDocumentModelName + "?customerId=" + this.customerId + "&status_ne=Deleted&_sort=" + (this.getKycDocumentFormData['orderColumn']) + ":" + (this.getKycDocumentFormData['orderType']) + "&_start=" + ((this.getKycDocumentFormData['pageNo'] - 1) * (this.getKycDocumentFormData['pageSize'])) + "&_limit=" + (this.getKycDocumentFormData['pageSize']);
    this._service.getFind(hitUrl).subscribe(data => {
      this.kycDocumentList = data;
      this.showingKycDocumentRecords = this.kycDocumentList.length;
      for (var i = 0; i < this.kycDocumentList.length; i++)
      {
        if (!((this.kycDocumentList[i]['fileDetail']['url'] == null) || (typeof(this.kycDocumentList[i]['fileDetail']['url']) == 'undefined')))
        {
          this.kycDocumentList[i]['fileDetail']['url2'] = environment.apiBaseUrl + this.kycDocumentList[i]['fileDetail']['url'].toString().trim().substring(1);
        }
      }

      hitUrl = this.kycDocumentModelName + "/count?customerId=" + this.customerId + "&status_ne=Deleted";
      this._service.getCount(hitUrl).subscribe(data => {
        this.totalKycDocumentRecords = parseFloat(data == null ? "0" : data.toString());
        this.lastKycDocumentPage = parseInt((this.totalKycDocumentRecords % this.showingKycDocumentRecords == 0) ? (this.totalKycDocumentRecords/this.showingKycDocumentRecords).toString() : ((this.totalKycDocumentRecords/this.showingKycDocumentRecords) + 1).toString());
        this.kycDocumentPages = [];
        for (var i = 1; i <= this.lastKycDocumentPage; i++) this.kycDocumentPages.push(i);
        this.loading = false;
      });

    });

  }

  deleteKycDocumentData(id) {
    var hitUrl = this.kycDocumentModelName + "/" + id;
    this._service.getUpdate(hitUrl, { status : 'Deleted' }).subscribe(data => {
      this.getKycDocumentData();
    });
  }

  filterKycDocumentColumn(event, id) {
    this.loading = true;
    var columnTitle = ($('#' + id).attr('data-columnTitle'));
    var orderType = ($('#' + id).attr('data-order').toString().toUpperCase());
    this.getKycDocumentFormData['orderColumn'] = ($('#' + id).attr('data-columnName'));
    this.getKycDocumentFormData['orderType'] = orderType;
    this.getKycDocumentFormData['pageNo'] = 1;
    $('.thChangeIcon').each(function(i, e) {
      $(this).attr('data-order', 'ASC');
      $(this).html((($(this).attr('data-columnTitle')) + ' <i class="ion-funnel"></i>'));
    });
    this.getKycDocumentData();
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
  
  navNextKycDocumentPage(event) {
    this.loading = true;
    if (parseInt(this.getKycDocumentFormData['pageNo'].toString()) < parseInt(this.lastKycDocumentPage)) this.getKycDocumentFormData['pageNo'] = (parseInt(this.getKycDocumentFormData['pageNo'].toString()) + 1);
    this.getKycDocumentData();
  }
  
  navPrevKycDocumentPage(event) {
    this.loading = true;
    if (parseInt(this.getKycDocumentFormData['pageNo'].toString()) > 1) this.getKycDocumentFormData['pageNo'] = (parseInt(this.getKycDocumentFormData['pageNo'].toString()) - 1);
    this.getKycDocumentData();
  }

  //searchValue(event) { this.loading = true; this.getKycDocumentFormData['pageNo'] = 1; this.getKycDocumentData(null, (event.srcElement.value), null, null, null, null); }
  
  kycDocumentPageChange(event) { this.loading = true; this.getKycDocumentFormData['pageNo'] = parseInt(event.srcElement.value.toString()); this.getKycDocumentData(); }
  
  kycDocumentPageSizeChange(event) { this.loading = true; this.getKycDocumentFormData['pageNo'] = 1; this.getKycDocumentFormData['pageSize'] = parseInt(event.srcElement.value.toString()); this.getKycDocumentData(); }
 
  exportKycDocuments(event) { event.preventDefault(); this.loading = true; alert('exporting ...'); this.loading = false; }

  importKycDocuments(event) { event.preventDefault(); this.loading = true; alert('importing...'); this.loading = false; }

  deleteKycDocument(event, id) { event.preventDefault(); this.loading = true; if (confirm('are you sure ?')) this.deleteKycDocumentData(id); this.loading = false; }

  deleteKycDocuments(event) {
    event.preventDefault();
    this.loading = true;
    if (($('.rowChecks:checked').length) > 0)
    {
      var Ids = [];
      $('.rowChecks:checked').each(function(i, e){ Ids.push($(this).attr('value')); });
      if (confirm('do you confirm to delete row ids:' + Ids)) for (var i = 0; i < Ids.length; i++) this.deleteKycDocumentData(Ids[i]);
      $('#headCheck').prop('checked', false);
      this.toggleCheckBoxes(null);
    }
    else
    {
      alert('please select kycDocument first on page, then try again...');
      this.loading = false;
    }
  }



  //C O N S U M E R - T A B


  public consumerModelName = 'consumers';

  public consumerList;
  
  public totalConsumerRecords;
  
  public showingConsumerRecords;
  
  public lastConsumerPage;

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
    'searchText': '',
    'orderColumn': 'id',
    'orderType': 'DESC',
    'pageNo': 1,
    'pageSize': 5,
  };

  getConsumerData() {
    this.loading = true;
    var hitUrl = this.consumerModelName + "?customerId=" + this.customerId + "&status_ne=Deleted&_sort=" + (this.getConsumerFormData['orderColumn']) + ":" + (this.getConsumerFormData['orderType']) + "&_start=" + ((this.getConsumerFormData['pageNo'] - 1) * (this.getConsumerFormData['pageSize'])) + "&_limit=" + (this.getConsumerFormData['pageSize']);
    this._service.getFind(hitUrl).subscribe(data => {
      this.consumerList = data;
      this.showingConsumerRecords = this.consumerList.length;
      for (var i = 0; i < this.consumerList.length; i++)
      {
        if ((this.consumerList[i]['userId'] == null) || (this.consumerList[i]['userId']['id'] == null) || (typeof(this.consumerList[i]['userId']) == 'undefined') || (typeof(this.consumerList[i]['userId']['id']) == 'undefined'))
        {
          this.consumerList[i]['userId'] = { };
          this.consumerList[i]['userId']['id'] = '';
        }
        if (!((this.consumerList[i]['userId']['dateOfBirth'] == null) || (typeof(this.consumerList[i]['userId']['dateOfBirth']) == 'undefined')))
        {
          this.consumerList[i]['userId']['dateOfBirth2'] = new Date(this.consumerList[i]['userId']['dateOfBirth'].toString().split('T')[0]).toString().substring(3, 15);
        }
      }

      hitUrl = this.consumerModelName + "/count?customerId=" + this.customerId + "&status_ne=Deleted";
      this._service.getCount(hitUrl).subscribe(data => {
        this.totalConsumerRecords = parseFloat(data == null ? "0" : data.toString());
        this.lastConsumerPage = parseInt((this.totalConsumerRecords % this.showingConsumerRecords == 0) ? (this.totalConsumerRecords/this.showingConsumerRecords).toString() : ((this.totalConsumerRecords/this.showingConsumerRecords) + 1).toString());
        this.consumerPages = [];
        for (var i = 1; i <= this.lastConsumerPage; i++) this.consumerPages.push(i);
        this.loading = false;
      });

    });

  }

  deleteConsumerData(id) {
    var hitUrl = this.consumerModelName + "/" + id;
    this._service.getUpdate(hitUrl, { status : 'Deleted' }).subscribe(data => {
      this.getConsumerData();
    });
  }

  filterConsumerColumn(event, id) {
    this.loading = true;
    var columnTitle = ($('#' + id).attr('data-columnTitle'));
    var orderType = ($('#' + id).attr('data-order').toString().toUpperCase());
    this.getConsumerFormData['orderColumn'] = ($('#' + id).attr('data-columnName'));
    this.getConsumerFormData['orderType'] = orderType;
    this.getConsumerFormData['pageNo'] = 1;
    $('.thChangeIcon').each(function(i, e) {
      $(this).attr('data-order', 'ASC');
      $(this).html((($(this).attr('data-columnTitle')) + ' <i class="ion-funnel"></i>'));
    });
    this.getConsumerData();
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
  
  navNextConsumerPage(event) {
    this.loading = true;
    if (parseInt(this.getConsumerFormData['pageNo'].toString()) < parseInt(this.lastConsumerPage)) this.getConsumerFormData['pageNo'] = (parseInt(this.getConsumerFormData['pageNo'].toString()) + 1);
    this.getConsumerData();
  }
  
  navPrevConsumerPage(event) {
    this.loading = true;
    if (parseInt(this.getConsumerFormData['pageNo'].toString()) > 1) this.getConsumerFormData['pageNo'] = (parseInt(this.getConsumerFormData['pageNo'].toString()) - 1);
    this.getConsumerData();
  }

  //searchValue(event) { this.loading = true; this.getConsumerFormData['pageNo'] = 1; this.getConsumerData(null, (event.srcElement.value), null, null, null, null); }
  
  consumerPageChange(event) { this.loading = true; this.getConsumerFormData['pageNo'] = parseInt(event.srcElement.value.toString()); this.getConsumerData(); }
  
  consumerPageSizeChange(event) { this.loading = true; this.getConsumerFormData['pageNo'] = 1; this.getConsumerFormData['pageSize'] = parseInt(event.srcElement.value.toString()); this.getConsumerData(); }
 
  exportConsumers(event) { event.preventDefault(); this.loading = true; alert('exporting ...'); this.loading = false; }

  importConsumers(event) { event.preventDefault(); this.loading = true; alert('importing...'); this.loading = false; }

  deleteCustomer(event, id) { event.preventDefault(); this.loading = true; if (confirm('are you sure ?')) this.deleteConsumerData(id); this.loading = false; }

  deleteConsumers(event) {
    event.preventDefault();
    this.loading = true;
    if (($('.rowChecks:checked').length) > 0)
    {
      var Ids = [];
      $('.rowChecks:checked').each(function(i, e){ Ids.push($(this).attr('value')); });
      if (confirm('do you confirm to delete row ids:' + Ids)) for (var i = 0; i < Ids.length; i++) this.deleteConsumerData(Ids[i]);
      $('#headCheck').prop('checked', false);
      this.toggleCheckBoxes(null);
    }
    else
    {
      alert('please select consumer first on page, then try again...');
      this.loading = false;
    }
  }



  //O R D E R - T A B


  public transactionModelName = 'transactions';

  public transactionList;
  
  public totalTransactionRecords;
  
  public showingTransactionRecords;
  
  public lastTransactionPage;
  
  public transactionPages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  public getTransactionFormData = {
    'searchText': '',
    'orderColumn': 'id',
    'orderType': 'DESC',
    'pageNo': 1,
    'pageSize': 5,
  };

  getTransactionData() {
    var hitUrl = this.transactionModelName + "?customerID=" + this.customerId + "&status_ne=Deleted&_sort=" + (this.getTransactionFormData['orderColumn']) + ":" + (this.getTransactionFormData['orderType']) + "&_start=" + ((this.getTransactionFormData['pageNo'] - 1) * (this.getTransactionFormData['pageSize'])) + "&_limit=" + (this.getTransactionFormData['pageSize']);
    this._service.getFind(hitUrl).subscribe(data => {
      this.transactionList = data;
      this.showingTransactionRecords = this.transactionList.length;
      for (var i = 0; i < this.transactionList.length; i++)
      {
        if ((this.transactionList[i]['userId'] == null) || (this.transactionList[i]['userId']['id'] == null) || (typeof(this.transactionList[i]['userId']) == 'undefined') || (typeof(this.transactionList[i]['userId']['id']) == 'undefined'))
        {
          this.transactionList[i]['userId'] = { };
          this.transactionList[i]['userId']['id'] = '';
        }
        if (!((this.transactionList[i]['userId']['dateOfBirth'] == null) || (typeof(this.transactionList[i]['userId']['dateOfBirth']) == 'undefined')))
        {
          this.transactionList[i]['userId']['dateOfBirth2'] = new Date(this.transactionList[i]['userId']['dateOfBirth'].toString().split('T')[0]).toString().substring(3, 15);
        }
      }

      hitUrl = this.transactionModelName + "/count?customerID=" + this.customerId + "&status_ne=Deleted";
      this._service.getCount(hitUrl).subscribe(data => {
        this.totalTransactionRecords = parseFloat(data == null ? "0" : data.toString());
        this.lastTransactionPage = parseInt((this.totalTransactionRecords % this.showingTransactionRecords == 0) ? (this.totalTransactionRecords/this.showingTransactionRecords).toString() : ((this.totalTransactionRecords/this.showingTransactionRecords) + 1).toString());
        this.transactionPages = [];
        for (var i = 1; i <= this.lastTransactionPage; i++) this.transactionPages.push(i);
        this.loading = false;
      });

    });

  }

  deleteTransactionData(id) {
    var hitUrl = this.transactionModelName + "/" + id;
    this._service.getUpdate(hitUrl, { status : 'Deleted' }).subscribe(data => {
      this.getTransactionData();
    });
  }

  filterTransactionColumn(event, id) {
    this.loading = true;
    var columnTitle = ($('#' + id).attr('data-columnTitle'));
    var orderType = ($('#' + id).attr('data-order').toString().toUpperCase());
    this.getTransactionFormData['orderColumn'] = ($('#' + id).attr('data-columnName'));
    this.getTransactionFormData['orderType'] = orderType;
    this.getTransactionFormData['pageNo'] = 1;
    $('.thChangeIcon').each(function(i, e) {
      $(this).attr('data-order', 'ASC');
      $(this).html((($(this).attr('data-columnTitle')) + ' <i class="ion-funnel"></i>'));
    });
    this.getTransactionData();
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
  
  navNextTransactionPage(event) {
    this.loading = true;
    if (parseInt(this.getTransactionFormData['pageNo'].toString()) < parseInt(this.lastTransactionPage)) this.getTransactionFormData['pageNo'] = (parseInt(this.getTransactionFormData['pageNo'].toString()) + 1);
    this.getTransactionData();
  }
  
  navPrevTransactionPage(event) {
    this.loading = true;
    if (parseInt(this.getTransactionFormData['pageNo'].toString()) > 1) this.getTransactionFormData['pageNo'] = (parseInt(this.getTransactionFormData['pageNo'].toString()) - 1);
    this.getTransactionData();
  }

  //searchValue(event) { this.loading = true; this.getTransactionFormData['pageNo'] = 1; this.getTransactionData(null, (event.srcElement.value), null, null, null, null); }
  
  transactionPageChange(event) { this.loading = true; this.getTransactionFormData['pageNo'] = parseInt(event.srcElement.value.toString()); this.getTransactionData(); }
  
  transactionPageSizeChange(event) { this.loading = true; this.getTransactionFormData['pageNo'] = 1; this.getTransactionFormData['pageSize'] = parseInt(event.srcElement.value.toString()); this.getTransactionData(); }
 
  exportTransactions(event) { event.preventDefault(); this.loading = true; alert('exporting ...'); this.loading = false; }

  importTransactions(event) { event.preventDefault(); this.loading = true; alert('importing...'); this.loading = false; }

  deleteTransaction(event, id) { event.preventDefault(); this.loading = true; if (confirm('are you sure ?')) this.deleteTransactionData(id); this.loading = false; }

  deleteTransactions(event) {
    event.preventDefault();
    this.loading = true;
    if (($('.rowChecks:checked').length) > 0)
    {
      var Ids = [];
      $('.rowChecks:checked').each(function(i, e){ Ids.push($(this).attr('value')); });
      if (confirm('do you confirm to delete row ids:' + Ids)) for (var i = 0; i < Ids.length; i++) this.deleteTransactionData(Ids[i]);
      $('#headCheck').prop('checked', false);
      this.toggleCheckBoxes(null);
    }
    else
    {
      alert('please select transaction first on page, then try again...');
      this.loading = false;
    }
  }



  // B I L L I N G - A D D R E S S - T A B


  public billingAddressModelName = 'customerbillingaddresses';

  public billingAddressList;
  
  public totalBillingAddressRecords;
  
  public showingBillingAddressRecords;
  
  public lastBillingAddressPage;
  
  public billingAddressPages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  public getBillingAddressFormData = {
    'searchText': '',
    'orderColumn': 'id',
    'orderType': 'DESC',
    'pageNo': 1,
    'pageSize': 5,
  };

  getBillingAddressData() {
    this.loading = true;
    var hitUrl = this.billingAddressModelName + "?customerId=" + this.customerId + "&status_ne=Deleted&_sort=" + (this.getBillingAddressFormData['orderColumn']) + ":" + (this.getBillingAddressFormData['orderType']) + "&_start=" + ((this.getBillingAddressFormData['pageNo'] - 1) * (this.getBillingAddressFormData['pageSize'])) + "&_limit=" + (this.getBillingAddressFormData['pageSize']);
    this._service.getFind(hitUrl).subscribe(data => {
      this.billingAddressList = data;
      this.showingBillingAddressRecords = this.billingAddressList.length;
      for (var i = 0; i < this.billingAddressList.length; i++)
      {
        if ((this.billingAddressList[i]['userId'] == null) || (this.billingAddressList[i]['userId']['id'] == null) || (typeof(this.billingAddressList[i]['userId']) == 'undefined') || (typeof(this.billingAddressList[i]['userId']['id']) == 'undefined'))
        {
          this.billingAddressList[i]['userId'] = { };
          this.billingAddressList[i]['userId']['id'] = '';
        }
        if (!((this.billingAddressList[i]['userId']['dateOfBirth'] == null) || (typeof(this.billingAddressList[i]['userId']['dateOfBirth']) == 'undefined')))
        {
          this.billingAddressList[i]['userId']['dateOfBirth2'] = new Date(this.billingAddressList[i]['userId']['dateOfBirth'].toString().split('T')[0]).toString().substring(3, 15);
        }
      }

      hitUrl = this.billingAddressModelName + "/count?customerId=" + this.customerId + "&status_ne=Deleted";
      this._service.getCount(hitUrl).subscribe(data => {
        this.totalBillingAddressRecords = parseFloat(data == null ? "0" : data.toString());
        this.lastBillingAddressPage = parseInt((this.totalBillingAddressRecords % this.showingBillingAddressRecords == 0) ? (this.totalBillingAddressRecords/this.showingBillingAddressRecords).toString() : ((this.totalBillingAddressRecords/this.showingBillingAddressRecords) + 1).toString());
        this.billingAddressPages = [];
        for (var i = 1; i <= this.lastBillingAddressPage; i++) this.billingAddressPages.push(i);
        this.loading = false;
      });

    });

  }

  deleteBillingAddressData(id) {
    var hitUrl = this.billingAddressModelName + "/" + id;
    this._service.getUpdate(hitUrl, { status : 'Deleted' }).subscribe(data => {
      this.getBillingAddressData();
    });
  }

  filterBillingAddressColumn(event, id) {
    this.loading = true;
    var columnTitle = ($('#' + id).attr('data-columnTitle'));
    var orderType = ($('#' + id).attr('data-order').toString().toUpperCase());
    this.getBillingAddressFormData['orderColumn'] = ($('#' + id).attr('data-columnName'));
    this.getBillingAddressFormData['orderType'] = orderType;
    this.getBillingAddressFormData['pageNo'] = 1;
    $('.thChangeIcon').each(function(i, e) {
      $(this).attr('data-order', 'ASC');
      $(this).html((($(this).attr('data-columnTitle')) + ' <i class="ion-funnel"></i>'));
    });
    this.getBillingAddressData();
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
  
  navNextBillingAddressPage(event) {
    this.loading = true;
    if (parseInt(this.getBillingAddressFormData['pageNo'].toString()) < parseInt(this.lastBillingAddressPage)) this.getBillingAddressFormData['pageNo'] = (parseInt(this.getBillingAddressFormData['pageNo'].toString()) + 1);
    this.getBillingAddressData();
  }
  
  navPrevBillingAddressPage(event) {
    this.loading = true;
    if (parseInt(this.getBillingAddressFormData['pageNo'].toString()) > 1) this.getBillingAddressFormData['pageNo'] = (parseInt(this.getBillingAddressFormData['pageNo'].toString()) - 1);
    this.getBillingAddressData();
  }

  //searchValue(event) { this.loading = true; this.getBillingAddressFormData['pageNo'] = 1; this.getBillingAddressData(null, (event.srcElement.value), null, null, null, null); }
  
  billingAddressPageChange(event) { this.loading = true; this.getBillingAddressFormData['pageNo'] = parseInt(event.srcElement.value.toString()); this.getBillingAddressData(); }
  
  billingAddressPageSizeChange(event) { this.loading = true; this.getBillingAddressFormData['pageNo'] = 1; this.getBillingAddressFormData['pageSize'] = parseInt(event.srcElement.value.toString()); this.getBillingAddressData(); }
 
  exportBillingAddresses(event) { event.preventDefault(); this.loading = true; alert('exporting ...'); this.loading = false; }

  importBillingAddresses(event) { event.preventDefault(); this.loading = true; alert('importing...'); this.loading = false; }

  deleteBillingAddress(event, id) { event.preventDefault(); this.loading = true; if (confirm('are you sure ?')) this.deleteBillingAddressData(id); this.loading = false; }

  deleteBillingAddressses(event) {
    event.preventDefault();
    this.loading = true;
    if (($('.rowChecks:checked').length) > 0)
    {
      var Ids = [];
      $('.rowChecks:checked').each(function(i, e){ Ids.push($(this).attr('value')); });
      if (confirm('do you confirm to delete row ids:' + Ids)) for (var i = 0; i < Ids.length; i++) this.deleteBillingAddressData(Ids[i]);
      $('#headCheck').prop('checked', false);
      this.toggleCheckBoxes(null);
    }
    else
    {
      alert('please select billingAddress first on page, then try again...');
      this.loading = false;
    }
  }



}

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
export class ConsumerEditComponent implements OnInit {

public consumerModelName = 'consumers';
public consumerId = null;
public loading;
public consumerEdit = {};

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

  goBackScript(event)
  {
    event.preventDefault();
    this.loading = true;
    window.history.back();
  }

  consumerFormSubmit(e) {
    this.loading = true;
    this.updateData(this.consumerEdit);
  }

  updateData(form) {
    this.loading = true;
    var hitUrl = this.consumerModelName + '/' + this.consumerId;
    this._service.getUpdate(hitUrl, form).subscribe(data => {
      console.log(data);
      window.location.href = '/#/pages/consumer/manage';
    });
  }

  getData() {
    var hitUrl = this.consumerModelName + '/' + this.consumerId;
    this._service.getFind(hitUrl).subscribe(data => {
      this.consumerEdit = data;
      this.loading = false;
    });    
  }

  constructor( private _http: HttpClient, private _service: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.loading = true;

  this.route.params.subscribe(params => {
    this.consumerId = (params['id']);
    this.getData();
  });

  this.getKycDocumentData();

  }

  onChangeTab(event)
  {
    console.log($('#' + event.tabTitle).attr('data-setaof'));
    this.loading = true;

    
    switch(event.tabTitle)
    {
      case 'KYC Document':{
        this.getKycDocumentData();
        break;
      }
      case 'Dependant Member':{
        this.getDependantMemberData();
        break;
      }
      case 'Allergy':{
        this.getAllergyData();
        break;
      }
      case 'Notification':{
        this.getNotificationData();
        break;
      }
      case 'Health Vault':{
        this.getHealthVaultData();
        break;
      }
      case 'Service Request':{
        this.getServiceRequestData();
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


  public kycDocumentModelName = 'consumerkycdocuments';

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
    var hitUrl = this.kycDocumentModelName + "?consumer=" + this.consumerId + "&_sort=" + (this.getKycDocumentFormData['orderColumn']) + ":" + (this.getKycDocumentFormData['orderType']) + "&_start=" + ((this.getKycDocumentFormData['pageNo'] - 1) * (this.getKycDocumentFormData['pageSize'])) + "&_limit=" + (this.getKycDocumentFormData['pageSize']); //status_ne=Deleted&
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

      hitUrl = this.kycDocumentModelName + "/count?consumer=" + this.consumerId;// + "&status_ne=Deleted";
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
    this._service.getDestroy(hitUrl).subscribe(data => {
      this.getKycDocumentData();
    });
  }

  //deleteKycDocumentData(id) {
  //  var hitUrl = this.kycDocumentModelName + "/" + id;
  //  this._service.getUpdate(hitUrl, { status : 'Deleted' }).subscribe(data => {
  //    this.getKycDocumentData();
  //  });
  //}

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









  // N O T F I C A T I O N - T A B


  public notificationModelName = 'consumernotifications';

  public notificationList;
  
  public totalNotificationRecords;
  
  public showingNotificationRecords;
  
  public lastNotificationPage;
  
  public notificationPages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  public getNotificationFormData = {
    'searchText': '',
    'orderColumn': 'id',
    'orderType': 'DESC',
    'pageNo': 1,
    'pageSize': 5,
  };

  getNotificationData() {
    var hitUrl = this.notificationModelName + "?consumerID=" + this.consumerId + "&_sort=" + (this.getNotificationFormData['orderColumn']) + ":" + (this.getNotificationFormData['orderType']) + "&_start=" + ((this.getNotificationFormData['pageNo'] - 1) * (this.getNotificationFormData['pageSize'])) + "&_limit=" + (this.getNotificationFormData['pageSize']); //status_ne=Deleted&
    this._service.getFind(hitUrl).subscribe(data => {
      this.notificationList = data;
      this.showingNotificationRecords = this.notificationList.length;

      hitUrl = this.notificationModelName + "/count?consumerID=" + this.consumerId;// + "&status_ne=Deleted";
      this._service.getCount(hitUrl).subscribe(data => {
        this.totalNotificationRecords = parseFloat(data == null ? "0" : data.toString());
        this.lastNotificationPage = parseInt((this.totalNotificationRecords % this.showingNotificationRecords == 0) ? (this.totalNotificationRecords/this.showingNotificationRecords).toString() : ((this.totalNotificationRecords/this.showingNotificationRecords) + 1).toString());
        this.notificationPages = [];
        for (var i = 1; i <= this.lastNotificationPage; i++) this.notificationPages.push(i);
        this.loading = false;
      });

    });

  }

  deleteNotificationData(id) {
    var hitUrl = this.notificationModelName + "/" + id;
    this._service.getDestroy(hitUrl).subscribe(data => {
      this.getNotificationData();
    });
  }

  //deleteNotificationData(id) {
  //  var hitUrl = this.notificationModelName + "/" + id;
  //  this._service.getUpdate(hitUrl, { status : 'Deleted' }).subscribe(data => {
  //    this.getNotificationData();
  //  });
  //}

  filterNotificationColumn(event, id) {
    this.loading = true;
    var columnTitle = ($('#' + id).attr('data-columnTitle'));
    var orderType = ($('#' + id).attr('data-order').toString().toUpperCase());
    this.getNotificationFormData['orderColumn'] = ($('#' + id).attr('data-columnName'));
    this.getNotificationFormData['orderType'] = orderType;
    this.getNotificationFormData['pageNo'] = 1;
    $('.thChangeIcon').each(function(i, e) {
      $(this).attr('data-order', 'ASC');
      $(this).html((($(this).attr('data-columnTitle')) + ' <i class="ion-funnel"></i>'));
    });
    this.getNotificationData();
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
  
  navNextNotificationPage(event) {
    this.loading = true;
    if (parseInt(this.getNotificationFormData['pageNo'].toString()) < parseInt(this.lastNotificationPage)) this.getNotificationFormData['pageNo'] = (parseInt(this.getNotificationFormData['pageNo'].toString()) + 1);
    this.getNotificationData();
  }
  
  navPrevNotificationPage(event) {
    this.loading = true;
    if (parseInt(this.getNotificationFormData['pageNo'].toString()) > 1) this.getNotificationFormData['pageNo'] = (parseInt(this.getNotificationFormData['pageNo'].toString()) - 1);
    this.getNotificationData();
  }

  //searchValue(event) { this.loading = true; this.getNotificationFormData['pageNo'] = 1; this.getNotificationData(null, (event.srcElement.value), null, null, null, null); }
  
  notificationPageChange(event) { this.loading = true; this.getNotificationFormData['pageNo'] = parseInt(event.srcElement.value.toString()); this.getNotificationData(); }
  
  notificationPageSizeChange(event) { this.loading = true; this.getNotificationFormData['pageNo'] = 1; this.getNotificationFormData['pageSize'] = parseInt(event.srcElement.value.toString()); this.getNotificationData(); }
 
  exportNotifications(event) { event.preventDefault(); this.loading = true; alert('exporting ...'); this.loading = false; }

  importNotifications(event) { event.preventDefault(); this.loading = true; alert('importing...'); this.loading = false; }

  deleteNotification(event, id) { event.preventDefault(); this.loading = true; if (confirm('are you sure ?')) this.deleteNotificationData(id); this.loading = false; }

  deleteNotifications(event) {
    event.preventDefault();
    this.loading = true;
    if (($('.rowChecks:checked').length) > 0)
    {
      var Ids = [];
      $('.rowChecks:checked').each(function(i, e){ Ids.push($(this).attr('value')); });
      if (confirm('do you confirm to delete row ids:' + Ids)) for (var i = 0; i < Ids.length; i++) this.deleteNotificationData(Ids[i]);
      $('#headCheck').prop('checked', false);
      this.toggleCheckBoxes(null);
    }
    else
    {
      alert('please select notification first on page, then try again...');
      this.loading = false;
    }
  }









  // H E A L T H - V A U L T - T A B


  public healthVaultModelName = 'consumerhealthvaults';

  public healthVaultList;
  
  public totalHealthVaultRecords;
  
  public showingHealthVaultRecords;
  
  public lastHealthVaultPage;
  
  public healthVaultPages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  public getHealthVaultFormData = {
    'searchText': '',
    'orderColumn': 'id',
    'orderType': 'DESC',
    'pageNo': 1,
    'pageSize': 5,
  };

  getHealthVaultData() {
    var hitUrl = this.healthVaultModelName + "?consumerID=" + this.consumerId + "&_sort=" + (this.getHealthVaultFormData['orderColumn']) + ":" + (this.getHealthVaultFormData['orderType']) + "&_start=" + ((this.getHealthVaultFormData['pageNo'] - 1) * (this.getHealthVaultFormData['pageSize'])) + "&_limit=" + (this.getHealthVaultFormData['pageSize']); //status_ne=Deleted&
    this._service.getFind(hitUrl).subscribe(data => {
      this.healthVaultList = data;
      this.showingHealthVaultRecords = this.healthVaultList.length;

      hitUrl = this.healthVaultModelName + "/count?consumerID=" + this.consumerId;// + "&status_ne=Deleted";
      this._service.getCount(hitUrl).subscribe(data => {
        this.totalHealthVaultRecords = parseFloat(data == null ? "0" : data.toString());
        this.lastHealthVaultPage = parseInt((this.totalHealthVaultRecords % this.showingHealthVaultRecords == 0) ? (this.totalHealthVaultRecords/this.showingHealthVaultRecords).toString() : ((this.totalHealthVaultRecords/this.showingHealthVaultRecords) + 1).toString());
        this.healthVaultPages = [];
        for (var i = 1; i <= this.lastHealthVaultPage; i++) this.healthVaultPages.push(i);
        this.loading = false;
      });

    });

  }

  deleteHealthVaultData(id) {
    var hitUrl = this.healthVaultModelName + "/" + id;
    this._service.getDestroy(hitUrl).subscribe(data => {
      this.getHealthVaultData();
    });
  }

  //deleteHealthVaultData(id) {
  //  var hitUrl = this.healthVaultModelName + "/" + id;
  //  this._service.getUpdate(hitUrl, { status : 'Deleted' }).subscribe(data => {
  //    this.getHealthVaultData();
  //  });
  //}

  filterHealthVaultColumn(event, id) {
    this.loading = true;
    var columnTitle = ($('#' + id).attr('data-columnTitle'));
    var orderType = ($('#' + id).attr('data-order').toString().toUpperCase());
    this.getHealthVaultFormData['orderColumn'] = ($('#' + id).attr('data-columnName'));
    this.getHealthVaultFormData['orderType'] = orderType;
    this.getHealthVaultFormData['pageNo'] = 1;
    $('.thChangeIcon').each(function(i, e) {
      $(this).attr('data-order', 'ASC');
      $(this).html((($(this).attr('data-columnTitle')) + ' <i class="ion-funnel"></i>'));
    });
    this.getHealthVaultData();
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
  
  navNextHealthVaultPage(event) {
    this.loading = true;
    if (parseInt(this.getHealthVaultFormData['pageNo'].toString()) < parseInt(this.lastHealthVaultPage)) this.getHealthVaultFormData['pageNo'] = (parseInt(this.getHealthVaultFormData['pageNo'].toString()) + 1);
    this.getHealthVaultData();
  }
  
  navPrevHealthVaultPage(event) {
    this.loading = true;
    if (parseInt(this.getHealthVaultFormData['pageNo'].toString()) > 1) this.getHealthVaultFormData['pageNo'] = (parseInt(this.getHealthVaultFormData['pageNo'].toString()) - 1);
    this.getHealthVaultData();
  }

  //searchValue(event) { this.loading = true; this.getHealthVaultFormData['pageNo'] = 1; this.getHealthVaultData(null, (event.srcElement.value), null, null, null, null); }
  
  healthVaultPageChange(event) { this.loading = true; this.getHealthVaultFormData['pageNo'] = parseInt(event.srcElement.value.toString()); this.getHealthVaultData(); }
  
  healthVaultPageSizeChange(event) { this.loading = true; this.getHealthVaultFormData['pageNo'] = 1; this.getHealthVaultFormData['pageSize'] = parseInt(event.srcElement.value.toString()); this.getHealthVaultData(); }
 
  exportHealthVaults(event) { event.preventDefault(); this.loading = true; alert('exporting ...'); this.loading = false; }

  importHealthVaults(event) { event.preventDefault(); this.loading = true; alert('importing...'); this.loading = false; }

  deleteHealthVault(event, id) { event.preventDefault(); this.loading = true; if (confirm('are you sure ?')) this.deleteHealthVaultData(id); this.loading = false; }

  deleteHealthVaults(event) {
    event.preventDefault();
    this.loading = true;
    if (($('.rowChecks:checked').length) > 0)
    {
      var Ids = [];
      $('.rowChecks:checked').each(function(i, e){ Ids.push($(this).attr('value')); });
      if (confirm('do you confirm to delete row ids:' + Ids)) for (var i = 0; i < Ids.length; i++) this.deleteHealthVaultData(Ids[i]);
      $('#headCheck').prop('checked', false);
      this.toggleCheckBoxes(null);
    }
    else
    {
      alert('please select healthVault first on page, then try again...');
      this.loading = false;
    }
  }









  // S E R V I C E - R E Q U E S T - T A B


  public serviceRequestModelName = 'consumerservicerequests';

  public serviceRequestList;
  
  public totalServiceRequestRecords;
  
  public showingServiceRequestRecords;
  
  public lastServiceRequestPage;
  
  public serviceRequestPages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  public getServiceRequestFormData = {
    'searchText': '',
    'orderColumn': 'id',
    'orderType': 'DESC',
    'pageNo': 1,
    'pageSize': 5,
  };

  getServiceRequestData() {
    var hitUrl = this.serviceRequestModelName + "?consumer=" + this.consumerId + "&_sort=" + (this.getServiceRequestFormData['orderColumn']) + ":" + (this.getServiceRequestFormData['orderType']) + "&_start=" + ((this.getServiceRequestFormData['pageNo'] - 1) * (this.getServiceRequestFormData['pageSize'])) + "&_limit=" + (this.getServiceRequestFormData['pageSize']); //status_ne=Deleted&
    this._service.getFind(hitUrl).subscribe(data => {
      this.serviceRequestList = data;
      this.showingServiceRequestRecords = this.serviceRequestList.length;
      

      hitUrl = this.serviceRequestModelName + "/count?consumer=" + this.consumerId;// + "&status_ne=Deleted";
      this._service.getCount(hitUrl).subscribe(data => {
        this.totalServiceRequestRecords = parseFloat(data == null ? "0" : data.toString());
        this.lastServiceRequestPage = parseInt((this.totalServiceRequestRecords % this.showingServiceRequestRecords == 0) ? (this.totalServiceRequestRecords/this.showingServiceRequestRecords).toString() : ((this.totalServiceRequestRecords/this.showingServiceRequestRecords) + 1).toString());
        this.serviceRequestPages = [];
        for (var i = 1; i <= this.lastServiceRequestPage; i++) this.serviceRequestPages.push(i);
        this.loading = false;
      });

    });

  }

  deleteServiceRequestData(id) {
    var hitUrl = this.serviceRequestModelName + "/" + id;
    this._service.getDestroy(hitUrl).subscribe(data => {
      this.getServiceRequestData();
    });
  }

  //deleteServiceRequestData(id) {
  //  var hitUrl = this.serviceRequestModelName + "/" + id;
  //  this._service.getUpdate(hitUrl, { status : 'Deleted' }).subscribe(data => {
  //    this.getServiceRequestData();
  //  });
  //}

  filterServiceRequestColumn(event, id) {
    this.loading = true;
    var columnTitle = ($('#' + id).attr('data-columnTitle'));
    var orderType = ($('#' + id).attr('data-order').toString().toUpperCase());
    this.getServiceRequestFormData['orderColumn'] = ($('#' + id).attr('data-columnName'));
    this.getServiceRequestFormData['orderType'] = orderType;
    this.getServiceRequestFormData['pageNo'] = 1;
    $('.thChangeIcon').each(function(i, e) {
      $(this).attr('data-order', 'ASC');
      $(this).html((($(this).attr('data-columnTitle')) + ' <i class="ion-funnel"></i>'));
    });
    this.getServiceRequestData();
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
  
  navNextServiceRequestPage(event) {
    this.loading = true;
    if (parseInt(this.getServiceRequestFormData['pageNo'].toString()) < parseInt(this.lastServiceRequestPage)) this.getServiceRequestFormData['pageNo'] = (parseInt(this.getServiceRequestFormData['pageNo'].toString()) + 1);
    this.getServiceRequestData();
  }
  
  navPrevServiceRequestPage(event) {
    this.loading = true;
    if (parseInt(this.getServiceRequestFormData['pageNo'].toString()) > 1) this.getServiceRequestFormData['pageNo'] = (parseInt(this.getServiceRequestFormData['pageNo'].toString()) - 1);
    this.getServiceRequestData();
  }

  //searchValue(event) { this.loading = true; this.getServiceRequestFormData['pageNo'] = 1; this.getServiceRequestData(null, (event.srcElement.value), null, null, null, null); }
  
  serviceRequestPageChange(event) { this.loading = true; this.getServiceRequestFormData['pageNo'] = parseInt(event.srcElement.value.toString()); this.getServiceRequestData(); }
  
  serviceRequestPageSizeChange(event) { this.loading = true; this.getServiceRequestFormData['pageNo'] = 1; this.getServiceRequestFormData['pageSize'] = parseInt(event.srcElement.value.toString()); this.getServiceRequestData(); }
 
  exportServiceRequests(event) { event.preventDefault(); this.loading = true; alert('exporting ...'); this.loading = false; }

  importServiceRequests(event) { event.preventDefault(); this.loading = true; alert('importing...'); this.loading = false; }

  deleteServiceRequest(event, id) { event.preventDefault(); this.loading = true; if (confirm('are you sure ?')) this.deleteServiceRequestData(id); this.loading = false; }

  deleteServiceRequests(event) {
    event.preventDefault();
    this.loading = true;
    if (($('.rowChecks:checked').length) > 0)
    {
      var Ids = [];
      $('.rowChecks:checked').each(function(i, e){ Ids.push($(this).attr('value')); });
      if (confirm('do you confirm to delete row ids:' + Ids)) for (var i = 0; i < Ids.length; i++) this.deleteServiceRequestData(Ids[i]);
      $('#headCheck').prop('checked', false);
      this.toggleCheckBoxes(null);
    }
    else
    {
      alert('please select serviceRequest first on page, then try again...');
      this.loading = false;
    }
  }









  // D E P E N D A N T - M E M B E R - T A B


  public dependantMemberModelName = 'consumerdependants';

  public dependantMemberList;
  
  public totalDependantMemberRecords;
  
  public showingDependantMemberRecords;
  
  public lastDependantMemberPage;
  
  public dependantMemberPages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  public getDependantMemberFormData = {
    'searchText': '',
    'orderColumn': 'id',
    'orderType': 'DESC',
    'pageNo': 1,
    'pageSize': 5,
  };

  getDependantMemberData() {
    var hitUrl = this.dependantMemberModelName + "?consumer=" + this.consumerId + "&_sort=" + (this.getDependantMemberFormData['orderColumn']) + ":" + (this.getDependantMemberFormData['orderType']) + "&_start=" + ((this.getDependantMemberFormData['pageNo'] - 1) * (this.getDependantMemberFormData['pageSize'])) + "&_limit=" + (this.getDependantMemberFormData['pageSize']); //status_ne=Deleted&
    this._service.getFind(hitUrl).subscribe(data => {
      this.dependantMemberList = data;
      this.showingDependantMemberRecords = this.dependantMemberList.length;
      

      hitUrl = this.dependantMemberModelName + "/count?consumer=" + this.consumerId;// + "&status_ne=Deleted";
      this._service.getCount(hitUrl).subscribe(data => {
        this.totalDependantMemberRecords = parseFloat(data == null ? "0" : data.toString());
        this.lastDependantMemberPage = parseInt((this.totalDependantMemberRecords % this.showingDependantMemberRecords == 0) ? (this.totalDependantMemberRecords/this.showingDependantMemberRecords).toString() : ((this.totalDependantMemberRecords/this.showingDependantMemberRecords) + 1).toString());
        this.dependantMemberPages = [];
        for (var i = 1; i <= this.lastDependantMemberPage; i++) this.dependantMemberPages.push(i);
        this.loading = false;
      });

    });

  }

  deleteDependantMemberData(id) {
    var hitUrl = this.dependantMemberModelName + "/" + id;
    this._service.getDestroy(hitUrl).subscribe(data => {
      this.getDependantMemberData();
    });
  }

  //deleteDependantMemberData(id) {
  //  var hitUrl = this.dependantMemberModelName + "/" + id;
  //  this._service.getUpdate(hitUrl, { status : 'Deleted' }).subscribe(data => {
  //    this.getDependantMemberData();
  //  });
  //}

  filterDependantMemberColumn(event, id) {
    this.loading = true;
    var columnTitle = ($('#' + id).attr('data-columnTitle'));
    var orderType = ($('#' + id).attr('data-order').toString().toUpperCase());
    this.getDependantMemberFormData['orderColumn'] = ($('#' + id).attr('data-columnName'));
    this.getDependantMemberFormData['orderType'] = orderType;
    this.getDependantMemberFormData['pageNo'] = 1;
    $('.thChangeIcon').each(function(i, e) {
      $(this).attr('data-order', 'ASC');
      $(this).html((($(this).attr('data-columnTitle')) + ' <i class="ion-funnel"></i>'));
    });
    this.getDependantMemberData();
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
  
  navNextDependantMemberPage(event) {
    this.loading = true;
    if (parseInt(this.getDependantMemberFormData['pageNo'].toString()) < parseInt(this.lastDependantMemberPage)) this.getDependantMemberFormData['pageNo'] = (parseInt(this.getDependantMemberFormData['pageNo'].toString()) + 1);
    this.getDependantMemberData();
  }
  
  navPrevDependantMemberPage(event) {
    this.loading = true;
    if (parseInt(this.getDependantMemberFormData['pageNo'].toString()) > 1) this.getDependantMemberFormData['pageNo'] = (parseInt(this.getDependantMemberFormData['pageNo'].toString()) - 1);
    this.getDependantMemberData();
  }

  //searchValue(event) { this.loading = true; this.getDependantMemberFormData['pageNo'] = 1; this.getDependantMemberData(null, (event.srcElement.value), null, null, null, null); }
  
  dependantMemberPageChange(event) { this.loading = true; this.getDependantMemberFormData['pageNo'] = parseInt(event.srcElement.value.toString()); this.getDependantMemberData(); }
  
  dependantMemberPageSizeChange(event) { this.loading = true; this.getDependantMemberFormData['pageNo'] = 1; this.getDependantMemberFormData['pageSize'] = parseInt(event.srcElement.value.toString()); this.getDependantMemberData(); }
 
  exportDependantMembers(event) { event.preventDefault(); this.loading = true; alert('exporting ...'); this.loading = false; }

  importDependantMembers(event) { event.preventDefault(); this.loading = true; alert('importing...'); this.loading = false; }

  deleteDependantMember(event, id) { event.preventDefault(); this.loading = true; if (confirm('are you sure ?')) this.deleteDependantMemberData(id); this.loading = false; }

  deleteDependantMembers(event) {
    event.preventDefault();
    this.loading = true;
    if (($('.rowChecks:checked').length) > 0)
    {
      var Ids = [];
      $('.rowChecks:checked').each(function(i, e){ Ids.push($(this).attr('value')); });
      if (confirm('do you confirm to delete row ids:' + Ids)) for (var i = 0; i < Ids.length; i++) this.deleteDependantMemberData(Ids[i]);
      $('#headCheck').prop('checked', false);
      this.toggleCheckBoxes(null);
    }
    else
    {
      alert('please select dependantMember first on page, then try again...');
      this.loading = false;
    }
  }









  // A L L E R G Y - T A B


  public allergyModelName = 'consumerallergies';

  public allergyList;
  
  public totalAllergyRecords;
  
  public showingAllergyRecords;
  
  public lastAllergyPage;
  
  public allergyPages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  public getAllergyFormData = {
    'searchText': '',
    'orderColumn': 'id',
    'orderType': 'DESC',
    'pageNo': 1,
    'pageSize': 5,
  };

  getAllergyData() {
    var hitUrl = this.allergyModelName + "?consumer=" + this.consumerId + "&_sort=" + (this.getAllergyFormData['orderColumn']) + ":" + (this.getAllergyFormData['orderType']) + "&_start=" + ((this.getAllergyFormData['pageNo'] - 1) * (this.getAllergyFormData['pageSize'])) + "&_limit=" + (this.getAllergyFormData['pageSize']); //status_ne=Deleted&
    this._service.getFind(hitUrl).subscribe(data => {
      this.allergyList = data;
      this.showingAllergyRecords = this.allergyList.length;

      hitUrl = this.allergyModelName + "/count?consumer=" + this.consumerId;// + "&status_ne=Deleted";
      this._service.getCount(hitUrl).subscribe(data => {
        this.totalAllergyRecords = parseFloat(data == null ? "0" : data.toString());
        this.lastAllergyPage = parseInt((this.totalAllergyRecords % this.showingAllergyRecords == 0) ? (this.totalAllergyRecords/this.showingAllergyRecords).toString() : ((this.totalAllergyRecords/this.showingAllergyRecords) + 1).toString());
        this.allergyPages = [];
        for (var i = 1; i <= this.lastAllergyPage; i++) this.allergyPages.push(i);
        this.loading = false;
      });

    });

  }

  deleteAllergyData(id) {
    var hitUrl = this.allergyModelName + "/" + id;
    this._service.getDestroy(hitUrl).subscribe(data => {
      this.getAllergyData();
    });
  }

  //deleteAllergyData(id) {
  //  var hitUrl = this.allergyModelName + "/" + id;
  //  this._service.getUpdate(hitUrl, { status : 'Deleted' }).subscribe(data => {
  //    this.getAllergyData();
  //  });
  //}

  filterAllergyColumn(event, id) {
    this.loading = true;
    var columnTitle = ($('#' + id).attr('data-columnTitle'));
    var orderType = ($('#' + id).attr('data-order').toString().toUpperCase());
    this.getAllergyFormData['orderColumn'] = ($('#' + id).attr('data-columnName'));
    this.getAllergyFormData['orderType'] = orderType;
    this.getAllergyFormData['pageNo'] = 1;
    $('.thChangeIcon').each(function(i, e) {
      $(this).attr('data-order', 'ASC');
      $(this).html((($(this).attr('data-columnTitle')) + ' <i class="ion-funnel"></i>'));
    });
    this.getAllergyData();
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
  
  navNextAllergyPage(event) {
    this.loading = true;
    if (parseInt(this.getAllergyFormData['pageNo'].toString()) < parseInt(this.lastAllergyPage)) this.getAllergyFormData['pageNo'] = (parseInt(this.getAllergyFormData['pageNo'].toString()) + 1);
    this.getAllergyData();
  }
  
  navPrevAllergyPage(event) {
    this.loading = true;
    if (parseInt(this.getAllergyFormData['pageNo'].toString()) > 1) this.getAllergyFormData['pageNo'] = (parseInt(this.getAllergyFormData['pageNo'].toString()) - 1);
    this.getAllergyData();
  }

  //searchValue(event) { this.loading = true; this.getAllergyFormData['pageNo'] = 1; this.getAllergyData(null, (event.srcElement.value), null, null, null, null); }
  
  allergyPageChange(event) { this.loading = true; this.getAllergyFormData['pageNo'] = parseInt(event.srcElement.value.toString()); this.getAllergyData(); }
  
  allergyPageSizeChange(event) { this.loading = true; this.getAllergyFormData['pageNo'] = 1; this.getAllergyFormData['pageSize'] = parseInt(event.srcElement.value.toString()); this.getAllergyData(); }
 
  exportAllergies(event) { event.preventDefault(); this.loading = true; alert('exporting ...'); this.loading = false; }

  importAllergies(event) { event.preventDefault(); this.loading = true; alert('importing...'); this.loading = false; }

  deleteAllergy(event, id) { event.preventDefault(); this.loading = true; if (confirm('are you sure ?')) this.deleteAllergyData(id); this.loading = false; }

  deleteAllergies(event) {
    event.preventDefault();
    this.loading = true;
    if (($('.rowChecks:checked').length) > 0)
    {
      var Ids = [];
      $('.rowChecks:checked').each(function(i, e){ Ids.push($(this).attr('value')); });
      if (confirm('do you confirm to delete row ids:' + Ids)) for (var i = 0; i < Ids.length; i++) this.deleteAllergyData(Ids[i]);
      $('#headCheck').prop('checked', false);
      this.toggleCheckBoxes(null);
    }
    else
    {
      alert('please select allergy first on page, then try again...');
      this.loading = false;
    }
  }



}
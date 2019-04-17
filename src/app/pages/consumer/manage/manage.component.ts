import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { ApiService } from '../../../services/helper/api.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
selector: 'ngx-manage',
  styleUrls: ['./manage.component.scss'],
  templateUrl: './manage.component.html',
})

export class ConsumerManageComponent implements OnInit {
  
  public loading;

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
    'modelUrl': 'consumers',
    'searchText': '',
    'orderColumn': 'id',
    'orderType': 'DESC',
    'pageNo': 1,
    'pageSize': 5,
  };

  constructor(private _http: HttpClient, private _service: ApiService, private modalService: NgbModal) { }

  ngOnInit() { this.refreshThisPage(); }

  refreshThisPage() { this.getConsumerData(); }

  goBackScript(event)
  {
    event.preventDefault();
    this.loading = true;
    window.history.back();
  }

  toggleCheckBoxes(event) {
    this.loading = true;
    $('.rowChecks').each(function() {
      $(this).prop('checked', (($('#headCheck').prop('checked')) ? (true) : (false)));
    });
    this.loading = false;
  }

  getConsumerData() {
    this.loading = true;
    var hitUrl = this.getConsumerFormData['modelUrl'];
    hitUrl += "?status_ne=Deleted&_sort=" + (this.getConsumerFormData['orderColumn']) + ":" + (this.getConsumerFormData['orderType']) + "&_start=" + ((this.getConsumerFormData['pageNo'] - 1) * (this.getConsumerFormData['pageSize'])) + "&_limit=" + (this.getConsumerFormData['pageSize']);
    this._service.getFind(hitUrl).subscribe(data => {
      this.consumerList = data;
      this.showingConsumerRecords = this.consumerList.length;
      
      hitUrl = this.getConsumerFormData['modelUrl'] + "/count?status_ne=Deleted";
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
    this.loading = true;
    var hitUrl = this.getConsumerFormData['modelUrl'] + "/" + id;
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

  searchTextChanged(event) { console.log(event.srcElement.value); }
  
  consumerPageChange(event) { this.loading = true; this.getConsumerFormData['pageNo'] = parseInt(event.srcElement.value.toString()); this.getConsumerData(); }
  
  consumerPageSizeChange(event) { this.loading = true; this.getConsumerFormData['pageNo'] = 1; this.getConsumerFormData['pageSize'] = parseInt(event.srcElement.value.toString()); this.getConsumerData(); }
 
  exportConsumers(event) { event.preventDefault(); this.loading = true; alert('exporting ...'); this.loading = false; }

  importConsumers(event) {
    var modal = `
    <div class="modal-header">
      <span>modalHeader</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      modalContent
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-primary" (click)="closeModal()">Save changes</button>
    </div>
  `;
    const activeModal = this.modalService.open(modal, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Static modal';
    activeModal.componentInstance.modalContent = `This is static modal, backdrop click
                                                    will not close it. Click × or confirmation button to close modal.`;
  }

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

}
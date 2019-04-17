import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { ApiService } from '../../../../services/helper/api.service';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';

@Component({
  selector: 'ngx-modal',
  template: `
    <div class="modal-header">
      <span>{{ modalHeader }}</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      {{ modalContent }}
      <div class="col-sm-6"><div class="form-group"><div class="input-group"><input nbInput fullWidth type="file" id="fileInput" name="fileInput" autocomplete="off" accept=".csv" (change)="convertFile($event);" required="required" placeholder="File" /></div></div></div>
    </div>
    <div class="modal-footer">
      {{ this.importerrors }}
    </div>
  `,
})
export class ModalComponent {

  modalHeader: string;
  modalContent: string;
  public importerrors: any;
  
constructor(private activeModal: NgbActiveModal, private _http: HttpClient, private _service: ApiService) { }

  closeModal() {
    this.activeModal.close();
  }

  //conver to json object
  public csvJSON(csv) {
    var lines = csv.toString().split(/\r|\n|\r/);
    var result = [];
    var headers = lines[0].toString().split(",");
    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].toString().split(",");
      for (var j = 0; j < headers.length; j++) obj[headers[j]] = currentline[j];
      if ((obj[headers[0]] != null) && (typeof(obj[headers[0]]) != 'undefined') && (obj[headers[0]].toString().trim().length > 0)) result.push(obj);
    }
    return result; //JavaScript object
    //return JSON.stringify(result); //JSON
  }

  convertFile(event) {
    const reader = new FileReader();
    reader.onload = () => {
      this.importCSV(this.csvJSON(reader.result));
    };
    reader.readAsText((<HTMLInputElement>document.getElementById('fileInput')).files[0]);
  }

  importCSV(formData) {
    this._service.getCreate('consumerDoctorBulkPost', formData).subscribe(dataOutput => {
      var error:any;     
      error = dataOutput;
      error = error.filter(item => item.errors);
      console.log(error);
      this.importerrors = "";
      for (var i = 0; i < error.length; i++) {
        this.importerrors += error[i].message;
        this.importerrors += "</br>";
      }
    });
  }
}

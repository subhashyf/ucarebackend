import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SOSComponent } from './sos.component';
import { SOSDashboardComponent } from './dashboard/dashboard.component';
import { SOSManageComponent } from './manage/manage.component';
import { SOSEditComponent } from './edit/edit.component';
import { SOSAddComponent } from './add/add.component';
import { SOSReportComponent } from './report/report.component';
import { Router, ActivatedRoute } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: SOSComponent,
  children: [{
    path: 'dashboard',
    component: SOSDashboardComponent,
  },
  {
    path: 'manage',
    component: SOSManageComponent,
  },
  {
    path: 'manage/edit/:id',
    component: SOSEditComponent,
  },
  {
    path: 'manage/add',
    component: SOSAddComponent,
  },
  {
    path: 'report',
    component: SOSReportComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SOSRoutingModule {

}

export const routedComponents = [
  SOSComponent,
  SOSDashboardComponent,
  SOSManageComponent,
  SOSEditComponent,
  SOSReportComponent,
  SOSAddComponent,
];

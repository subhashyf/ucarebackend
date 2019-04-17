import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerComponent } from './customer.component';
import { CustomerDashboardComponent } from './dashboard/dashboard.component';
import { CustomerManageComponent } from './manage/manage.component';
import { CustomerEditComponent } from './edit/edit.component';
import { CustomerAddComponent } from './add/add.component';
import { CustomerReportComponent } from './report/report.component';
import { Router, ActivatedRoute } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: CustomerComponent,
  children: [{
    path: 'dashboard',
    component: CustomerDashboardComponent,
  },
  {
    path: 'manage',
    component: CustomerManageComponent,
  },
  {
    path: 'manage/edit/:id',
    component: CustomerEditComponent,
  },
  {
    path: 'manage/add',
    component: CustomerAddComponent,
  },
  {
    path: 'kyc/add',
    component: CustomerAddComponent,
  },
  {
    path: 'report',
    component: CustomerReportComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {

}

export const routedComponents = [
  CustomerComponent,
  CustomerDashboardComponent,
  CustomerManageComponent,
  CustomerEditComponent,
  CustomerReportComponent,
  CustomerAddComponent,
];

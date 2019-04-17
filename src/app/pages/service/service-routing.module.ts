import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceComponent } from './service.component';
import { ServiceDashboardComponent } from './dashboard/dashboard.component';
import { ServiceManageComponent } from './manage/manage.component';
import { ServiceInventoryComponent } from './inventory/inventory.component';
import { ServiceEditComponent } from './edit/edit.component';
import { ServiceAddComponent } from './add/add.component';
import { ServiceReportComponent } from './report/report.component';
import { Router, ActivatedRoute } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: ServiceComponent,
  children: [{
    path: 'dashboard',
    component: ServiceDashboardComponent,
  },
  {
    path: 'manage',
    component: ServiceManageComponent,
  },
  {
    path: 'inventory',
    component: ServiceInventoryComponent,
  },
  {
    path: 'manage/edit/:id',
    component: ServiceEditComponent,
  },
  {
    path: 'manage/add',
    component: ServiceAddComponent,
  },
  {
    path: 'report',
    component: ServiceReportComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRoutingModule {

}

export const routedComponents = [
  ServiceComponent,
  ServiceDashboardComponent,
  ServiceManageComponent,
  ServiceInventoryComponent,
  ServiceEditComponent,
  ServiceReportComponent,
  ServiceAddComponent,
];

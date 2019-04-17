import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeviceComponent } from './device.component';
import { DeviceDashboardComponent } from './dashboard/dashboard.component';
import { DeviceManageComponent } from './manage/manage.component';
import { DeviceInventoryComponent } from './inventory/inventory.component';
import { DeviceEditComponent } from './edit/edit.component';
import { DeviceAddComponent } from './add/add.component';
import { DeviceReportComponent } from './report/report.component';
import { Router, ActivatedRoute } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: DeviceComponent,
  children: [{
    path: 'dashboard',
    component: DeviceDashboardComponent,
  },
  {
    path: 'manage',
    component: DeviceManageComponent,
  },
  {
    path: 'inventory',
    component: DeviceInventoryComponent,
  },
  {
    path: 'manage/edit/:id',
    component: DeviceEditComponent,
  },
  {
    path: 'manage/add',
    component: DeviceAddComponent,
  },
  {
    path: 'report',
    component: DeviceReportComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceRoutingModule {

}

export const routedComponents = [
  DeviceComponent,
  DeviceDashboardComponent,
  DeviceManageComponent,
  DeviceInventoryComponent,
  DeviceEditComponent,
  DeviceReportComponent,
  DeviceAddComponent,
];

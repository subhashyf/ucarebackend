import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PackageComponent } from './package.component';
import { PackageDashboardComponent } from './dashboard/dashboard.component';
import { PackageManageComponent } from './manage/manage.component';
import { PackageEditComponent } from './edit/edit.component';
import { PackageAddComponent } from './add/add.component';
import { PackageReportComponent } from './report/report.component';
import { Router, ActivatedRoute } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: PackageComponent,
  children: [{
    path: 'dashboard',
    component: PackageDashboardComponent,
  },
  {
    path: 'manage',
    component: PackageManageComponent,
  },
  {
    path: 'manage/edit/:id',
    component: PackageEditComponent,
  },
  {
    path: 'manage/add',
    component: PackageAddComponent,
  },
  {
    path: 'report',
    component: PackageReportComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackageRoutingModule {

}

export const routedComponents = [
  PackageComponent,
  PackageDashboardComponent,
  PackageManageComponent,
  PackageEditComponent,
  PackageReportComponent,
  PackageAddComponent,
];

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SafeMeComponent } from './safeme.component';
import { SafeMeDashboardComponent } from './dashboard/dashboard.component';
import { SafeMeManageComponent } from './manage/manage.component';
import { SafeMeEditComponent } from './edit/edit.component';
import { SafeMeAddComponent } from './add/add.component';
import { SafeMeReportComponent } from './report/report.component';

const routes: Routes = [{
  path: '',
  component: SafeMeComponent,
  children: [{
    path: 'dashboard',
    component: SafeMeDashboardComponent,
  },
  {
    path: 'manage',
    component: SafeMeManageComponent,
  },
  {
    path: 'manage/edit/:id',
    component: SafeMeEditComponent,
  },
  {
    path: 'manage/add',
    component: SafeMeAddComponent,
  },
  {
    path: 'report',
    component: SafeMeReportComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SafeMeRoutingModule { }

export const routedComponents = [
  SafeMeComponent,
  SafeMeDashboardComponent,
  SafeMeManageComponent,
  SafeMeEditComponent,
  SafeMeReportComponent,
  SafeMeAddComponent,
];

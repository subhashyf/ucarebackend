import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsumerComponent } from './consumer.component';
import { ConsumerDashboardComponent } from './dashboard/dashboard.component';
import { ConsumerManageComponent } from './manage/manage.component';
import { ConsumerReportComponent } from './report/report.component';
import { ConsumerAddComponent } from './add/add.component';
import { ConsumerEditComponent } from './edit/edit.component';

const routes: Routes = [{
  path: '',
  component: ConsumerComponent,
  children: [{
    path: 'dashboard',
    component: ConsumerDashboardComponent,
  },
  {
    path: 'manage',
    component: ConsumerManageComponent,
  },
  {
    path: 'report',
    component: ConsumerReportComponent,
  },
  {
    path: 'manage/edit/:id',
    component: ConsumerEditComponent,
  },
  {
    path: 'manage/add',
    component: ConsumerAddComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumerRoutingModule { }

export const routedComponents = [
  ConsumerComponent,
  ConsumerDashboardComponent,
  ConsumerManageComponent,
  ConsumerReportComponent,
  ConsumerEditComponent,
  ConsumerAddComponent,
];

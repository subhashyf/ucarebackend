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
    path: 'manage/:model',
    component: ConsumerManageComponent,
  },
  {
    path: 'report/:model',
    component: ConsumerReportComponent,
  },
  {
    path: 'manage/edit/:model/:id',
    component: ConsumerEditComponent,
  },
  {
    path: 'manage/add/:model',
    component: ConsumerEditComponent,
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

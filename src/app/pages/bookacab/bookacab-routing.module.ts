import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookACabComponent } from './bookacab.component';
import { BookACabDashboardComponent } from './dashboard/dashboard.component';
import { BookACabManageComponent } from './manage/manage.component';
import { BookACabEditComponent } from './edit/edit.component';
import { BookACabAddComponent } from './add/add.component';
import { BookACabReportComponent } from './report/report.component';

const routes: Routes = [{
  path: '',
  component: BookACabComponent,
  children: [{
    path: 'dashboard',
    component: BookACabDashboardComponent,
  },
  {
    path: 'manage',
    component: BookACabManageComponent,
  },
  {
    path: 'manage/edit/:id',
    component: BookACabEditComponent,
  },
  {
    path: 'manage/add',
    component: BookACabAddComponent,
  },
  {
    path: 'report',
    component: BookACabReportComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookACabRoutingModule { }

export const routedComponents = [
  BookACabComponent,
  BookACabDashboardComponent,
  BookACabManageComponent,
  BookACabEditComponent,
  BookACabReportComponent,
  BookACabAddComponent,
];

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KitComponent } from './kit.component';
import { KitDashboardComponent } from './dashboard/dashboard.component';
import { KitManageComponent } from './manage/manage.component';
import { KitEditComponent } from './edit/edit.component';
import { KitAddComponent } from './add/add.component';
import { KitReportComponent } from './report/report.component';
import { Router, ActivatedRoute } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: KitComponent,
  children: [{
    path: 'dashboard',
    component: KitDashboardComponent,
  },
  {
    path: 'manage',
    component: KitManageComponent,
  },
  {
    path: 'manage/edit/:id',
    component: KitEditComponent,
  },
  {
    path: 'manage/add',
    component: KitAddComponent,
  },
  {
    path: 'report',
    component: KitReportComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KitRoutingModule {

}

export const routedComponents = [
  KitComponent,
  KitDashboardComponent,
  KitManageComponent,
  KitEditComponent,
  KitReportComponent,
  KitAddComponent,
];

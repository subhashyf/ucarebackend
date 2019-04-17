import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProviderComponent } from './provider.component';
import { ProviderDashboardComponent } from './dashboard/dashboard.component';
import { ProviderManageComponent } from './manage/manage.component';
import { ProviderEditComponent } from './edit/edit.component';
import { ProviderAddComponent } from './add/add.component';
import { ProviderReportComponent } from './report/report.component';
import { Router, ActivatedRoute } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: ProviderComponent,
  children: [{
    path: 'dashboard',
    component: ProviderDashboardComponent,
  },
  {
    path: 'manage',
    component: ProviderManageComponent,
  },
  {
    path: 'manage/edit/:id',
    component: ProviderEditComponent,
  },
  {
    path: 'manage/add',
    component: ProviderAddComponent,
  },
  {
    path: 'report',
    component: ProviderReportComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProviderRoutingModule {

}

export const routedComponents = [
  ProviderComponent,
  ProviderDashboardComponent,
  ProviderManageComponent,
  ProviderEditComponent,
  ProviderReportComponent,
  ProviderAddComponent,
];

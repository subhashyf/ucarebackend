import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpMeComponent } from './helpme.component';
import { HelpMeDashboardComponent } from './dashboard/dashboard.component';
import { HelpMeManageComponent } from './manage/manage.component';
import { HelpMeEditComponent } from './edit/edit.component';
import { HelpMeAddComponent } from './add/add.component';
import { HelpMeReportComponent } from './report/report.component';

const routes: Routes = [{
  path: '',
  component: HelpMeComponent,
  children: [{
    path: 'dashboard',
    component: HelpMeDashboardComponent,
  },
  {
    path: 'manage',
    component: HelpMeManageComponent,
  },
  {
    path: 'manage/edit/:id',
    component: HelpMeEditComponent,
  },
  {
    path: 'manage/add',
    component: HelpMeAddComponent,
  },
  {
    path: 'report',
    component: HelpMeReportComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpMeRoutingModule { }

export const routedComponents = [
  HelpMeComponent,
  HelpMeDashboardComponent,
  HelpMeManageComponent,
  HelpMeEditComponent,
  HelpMeReportComponent,
  HelpMeAddComponent,
];

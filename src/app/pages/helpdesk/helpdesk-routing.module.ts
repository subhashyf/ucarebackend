import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpDeskComponent } from './helpdesk.component';
import { HelpDeskDashboardComponent } from './dashboard/dashboard.component';
import { HelpDeskReportComponent } from './report/report.component';

const routes: Routes = [{
  path: '',
  component: HelpDeskComponent,
  children: [{
    path: 'dashboard',
    component: HelpDeskDashboardComponent,
  },
  {
    path: 'report',
    component: HelpDeskReportComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpDeskRoutingModule { }

export const routedComponents = [
  HelpDeskComponent,
  HelpDeskDashboardComponent,
  HelpDeskReportComponent,
];

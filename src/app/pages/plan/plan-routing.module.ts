import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanComponent } from './plan.component';
import { PlanDashboardComponent } from './dashboard/dashboard.component';
import { PlanManageComponent } from './manage/manage.component';
import { PlanAssignmentComponent } from './assignment/assignment.component';
import { PlanReportComponent } from './report/report.component';
import { PlanAddComponent } from './add/add.component';
import { PlanEditComponent } from './edit/edit.component';

const routes: Routes = [{
  path: '',
  component: PlanComponent,
  children: [{
    path: 'dashboard',
    component: PlanDashboardComponent,
  },
  {
    path: 'manage',
    component: PlanManageComponent,
  },
  {
    path: 'assignment',
    component: PlanAssignmentComponent,
  },
  {
    path: 'edit/:id',
    component: PlanEditComponent,
  },
  {
    path: 'add',
    component: PlanAddComponent,
  },
  {
    path: 'report',
    component: PlanReportComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanRoutingModule { }

export const routedComponents = [
  PlanComponent,
  PlanDashboardComponent,
  PlanManageComponent,
  PlanAssignmentComponent,
  PlanReportComponent,
  PlanEditComponent,
  PlanAddComponent,
];

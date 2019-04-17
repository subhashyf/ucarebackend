import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiagnosticAppointmentComponent } from './diagnosticappointment.component';
import { DiagnosticAppointmentDashboardComponent } from './dashboard/dashboard.component';
import { DiagnosticAppointmentManageComponent } from './manage/manage.component';
import { DiagnosticAppointmentReportComponent } from './report/report.component';
import { DiagnosticAppointmentAddComponent } from './add/add.component';
import { DiagnosticAppointmentEditComponent } from './edit/edit.component';

const routes: Routes = [{
  path: '',
  component: DiagnosticAppointmentComponent,
  children: [{
    path: 'dashboard',
    component: DiagnosticAppointmentDashboardComponent,
  },
  {
    path: 'manage',
    component: DiagnosticAppointmentManageComponent,
  },
  {
    path: 'edit/:id',
    component: DiagnosticAppointmentEditComponent,
  },
  {
    path: 'add',
    component: DiagnosticAppointmentAddComponent,
  },
  {
    path: 'report',
    component: DiagnosticAppointmentReportComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiagnosticAppointmentRoutingModule { }

export const routedComponents = [
  DiagnosticAppointmentComponent,
  DiagnosticAppointmentDashboardComponent,
  DiagnosticAppointmentManageComponent,
  DiagnosticAppointmentReportComponent,
  DiagnosticAppointmentAddComponent,
  DiagnosticAppointmentEditComponent,
];

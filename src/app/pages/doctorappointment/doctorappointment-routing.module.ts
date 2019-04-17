import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorAppointmentComponent } from './doctorappointment.component';
import { DoctorAppointmentDashboardComponent } from './dashboard/dashboard.component';
import { DoctorAppointmentManageComponent } from './manage/manage.component';
import { DoctorAppointmentReportComponent } from './report/report.component';
import { DoctorAppointmentAddComponent } from './add/add.component';
import { DoctorAppointmentEditComponent } from './edit/edit.component';

const routes: Routes = [{
  path: '',
  component: DoctorAppointmentComponent,
  children: [{
    path: 'dashboard',
    component: DoctorAppointmentDashboardComponent,
  },
  {
    path: 'manage',
    component: DoctorAppointmentManageComponent,
  },
  {
    path: 'edit/:id',
    component: DoctorAppointmentEditComponent,
  },
  {
    path: 'add',
    component: DoctorAppointmentAddComponent,
  },
  {
    path: 'report',
    component: DoctorAppointmentReportComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorAppointmentRoutingModule { }

export const routedComponents = [
  DoctorAppointmentComponent,
  DoctorAppointmentDashboardComponent,
  DoctorAppointmentManageComponent,
  DoctorAppointmentReportComponent,
  DoctorAppointmentAddComponent,
  DoctorAppointmentEditComponent,
];

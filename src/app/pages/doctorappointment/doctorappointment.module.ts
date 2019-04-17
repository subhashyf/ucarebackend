import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DoctorAppointmentRoutingModule, routedComponents } from './doctorappointment-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    ThemeModule,
    DoctorAppointmentRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class DoctorAppointmentModule { }

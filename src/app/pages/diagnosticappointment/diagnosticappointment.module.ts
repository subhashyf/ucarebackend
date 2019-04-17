import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DiagnosticAppointmentRoutingModule, routedComponents } from './diagnosticappointment-routing.module';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  imports: [
    ThemeModule,
    DiagnosticAppointmentRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class DiagnosticAppointmentModule { }

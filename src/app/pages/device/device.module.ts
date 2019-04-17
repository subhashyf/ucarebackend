import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DeviceRoutingModule, routedComponents } from './device-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    ThemeModule,
    DeviceRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class DeviceModule { }

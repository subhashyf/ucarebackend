import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ServiceRoutingModule, routedComponents } from './service-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    ThemeModule,
    ServiceRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class ServiceModule { }

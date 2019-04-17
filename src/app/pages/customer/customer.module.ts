import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { CustomerRoutingModule, routedComponents } from './customer-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    ThemeModule,
    CustomerRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class CustomerModule { }

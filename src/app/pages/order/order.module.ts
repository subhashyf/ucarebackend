import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { OrderRoutingModule, routedComponents } from './order-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    ThemeModule,
    OrderRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class OrderModule { }

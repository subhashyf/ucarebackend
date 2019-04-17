import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { KitRoutingModule, routedComponents } from './kit-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    ThemeModule,
    KitRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class KitModule { }

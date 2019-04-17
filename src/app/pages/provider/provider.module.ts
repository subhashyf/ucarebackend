import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ProviderRoutingModule, routedComponents } from './provider-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    ThemeModule,
    ProviderRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class ProviderModule { }

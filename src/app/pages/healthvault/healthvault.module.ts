import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { HealthVaultRoutingModule, routedComponents } from './healthvault-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    ThemeModule,
    HealthVaultRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class HealthVaultModule { }

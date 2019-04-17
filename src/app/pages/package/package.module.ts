import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { PackageRoutingModule, routedComponents } from './package-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    ThemeModule,
    PackageRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class PackageModule { }

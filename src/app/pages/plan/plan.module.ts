import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { PlanRoutingModule, routedComponents } from './plan-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    ThemeModule,
    PlanRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class PlanModule { }

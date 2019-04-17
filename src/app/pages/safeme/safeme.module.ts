import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { SafeMeRoutingModule, routedComponents } from './safeme-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    ThemeModule,
    SafeMeRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class SafeMeModule { }

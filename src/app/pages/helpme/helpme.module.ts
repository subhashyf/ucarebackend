import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { HelpMeRoutingModule, routedComponents } from './helpme-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    ThemeModule,
    HelpMeRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class HelpMeModule { }

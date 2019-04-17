import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { HelpDeskRoutingModule, routedComponents } from './helpdesk-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    ThemeModule,
    HelpDeskRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class HelpDeskModule { }

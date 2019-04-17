import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { BookACabRoutingModule, routedComponents } from './bookacab-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    ThemeModule,
    BookACabRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class BookACabModule { }

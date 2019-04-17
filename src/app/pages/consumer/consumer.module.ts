import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ConsumerRoutingModule, routedComponents } from './consumer-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { ModalComponent } from './manage/modal/modal.component';
import { ExcelService } from './excel.service';

const ENTRY_COMPONENTS = [
  ModalComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    ConsumerRoutingModule,
    DataTablesModule,
  ],
  providers: [ExcelService],
  declarations: [
    ...routedComponents,
    ModalComponent,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class ConsumerModule { }

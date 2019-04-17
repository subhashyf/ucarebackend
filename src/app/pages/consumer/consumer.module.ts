import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ConsumerRoutingModule, routedComponents } from './consumer-routing.module';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    ThemeModule,
    ConsumerRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})

export class ConsumerModule { }

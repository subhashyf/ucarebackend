import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { HealthDataTypeRoutingModule, routedComponents } from './healthdatatype-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    HealthDataTypeRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class HealthDataTypeModule { }

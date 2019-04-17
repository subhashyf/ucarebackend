import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';

import { UMACRoutingModule, routedComponents } from './umac-routing.module';

@NgModule({
  imports: [
  	ThemeModule,
    UMACRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class UMACModule { }

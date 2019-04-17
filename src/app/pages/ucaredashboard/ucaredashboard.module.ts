import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxEchartsModule } from 'ngx-echarts';

import { UCareDashboardComponent } from './ucaredashboard.component';
import { EchartsBarAnimationComponent } from './echarts/bar-animation.component';
import { EchartsRadarComponent } from './echarts/radar.component';

const components = [
  EchartsBarAnimationComponent,
  EchartsRadarComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
  ],
  declarations: [
    UCareDashboardComponent,
    ...components
    ],
})

export class UCareDashboardModule { }
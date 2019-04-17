import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';

import { TestRoutingModule, routedComponents } from './test-routing.module';
import { CustomEchartsBarAnimationComponent } from './fifth-test/echarts-bar-animation.component';
import { EchartsRadarComponent } from './fifth-test/echarts-radar.component';

const components = [
  CustomEchartsBarAnimationComponent,
  EchartsRadarComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    TestRoutingModule,
  ],
  declarations: [...routedComponents, ...components],
})
export class TestModule { }
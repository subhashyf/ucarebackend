import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestComponent } from './test.component';
import { FirstTestComponent } from './first-test/first-test.component';
import { SecondTestComponent } from './second-test/second-test.component';
import { ThirdTestComponent } from './third-test/third-test.component';
import { FourthTestComponent } from './fourth-test/fourth-test.component';
import { FifthTestComponent } from './fifth-test/fifth-test.component';
import { SixthTestComponent } from './sixth-test/sixth-test.component';

const routes: Routes = [{
  path: '',
  component: TestComponent,
  children: [{
    path: 'first-test',
    component: FirstTestComponent,
  },
  {
    path: 'second-test',
    component: SecondTestComponent,
  },
  {
    path: 'third-test',
    component: ThirdTestComponent,
  },
  {
    path: 'fourth-test',
    component: FourthTestComponent,
  },
  {
    path: 'fifth-test',
    component: FifthTestComponent,
  },
  {
    path: 'sixth-test',
    component: SixthTestComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestRoutingModule { }

export const routedComponents = [
  TestComponent,
  FirstTestComponent,
  SecondTestComponent,
  ThirdTestComponent,
  FourthTestComponent,
  FifthTestComponent,
  SixthTestComponent,
];
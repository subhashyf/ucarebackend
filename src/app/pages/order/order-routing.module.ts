import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderComponent } from './order.component';
import { OrderDashboardComponent } from './dashboard/dashboard.component';
import { OrderManageComponent } from './manage/manage.component';
import { OrderEditComponent } from './edit/edit.component';
import { OrderAddComponent } from './add/add.component';
import { OrderReportComponent } from './report/report.component';
import { Router, ActivatedRoute } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: OrderComponent,
  children: [{
    path: 'dashboard',
    component: OrderDashboardComponent,
  },
  {
    path: 'manage',
    component: OrderManageComponent,
  },
  {
    path: 'manage/edit/:id',
    component: OrderEditComponent,
  },
  {
    path: 'manage/add',
    component: OrderAddComponent,
  },
  {
    path: 'report',
    component: OrderReportComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {

}

export const routedComponents = [
  OrderComponent,
  OrderDashboardComponent,
  OrderManageComponent,
  OrderEditComponent,
  OrderReportComponent,
  OrderAddComponent,
];

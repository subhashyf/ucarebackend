import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HealthDataTypeComponent } from './healthdatatype.component';
import { HealthDataTypeManageComponent } from './manage/manage.component';
import { HealthDataTypeAddComponent } from './add/add.component';
import { HealthDataTypeEditComponent } from './edit/edit.component';

const routes: Routes = [{
  path: '',
  component: HealthDataTypeComponent,
  children: [{
    path: 'manage',
    component: HealthDataTypeManageComponent,
  },
  {
    path: 'manage/add',
    component: HealthDataTypeAddComponent,
  },
  {
    path: 'manage/edit/:id',
    component: HealthDataTypeEditComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HealthDataTypeRoutingModule { }

export const routedComponents = [
  HealthDataTypeComponent,
  HealthDataTypeManageComponent,
  HealthDataTypeAddComponent,
  HealthDataTypeEditComponent,
];

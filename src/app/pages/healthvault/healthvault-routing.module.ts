import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HealthVaultComponent } from './healthvault.component';
import { HealthVaultDashboardComponent } from './dashboard/dashboard.component';
import { HealthVaultSleepComponent } from './sleep/sleep.component';
import { HealthVaultStepComponent } from './step/step.component';
import { HealthVaultStressComponent } from './stress/stress.component';
import { HealthVaultCalorieComponent } from './calorie/calorie.component';
import { HealthVaultECGComponent } from './ecg/ecg.component';

const routes: Routes = [{
  path: '',
  component: HealthVaultComponent,
  children: [{
    path: 'dashboard',
    component: HealthVaultDashboardComponent,
  },
  {
    path: 'report/sleep',
    component: HealthVaultSleepComponent,
  },
  {
    path: 'report/step',
    component: HealthVaultStepComponent,
  },
  {
    path: 'report/stress',
    component: HealthVaultStressComponent,
  },
  {
    path: 'report/calorie',
    component: HealthVaultCalorieComponent,
  },
  {
    path: 'report/ecg',
    component: HealthVaultECGComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HealthVaultRoutingModule { }

export const routedComponents = [
  HealthVaultComponent,
  HealthVaultDashboardComponent,
  HealthVaultSleepComponent,
  HealthVaultStepComponent,
  HealthVaultStressComponent,
  HealthVaultCalorieComponent,
  HealthVaultECGComponent,
];

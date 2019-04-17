import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UMACComponent } from './umac.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [{
  path: '',
  component: UMACComponent,
  children: [{
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UMACRoutingModule { }

export const routedComponents = [
  UMACComponent,
  LoginComponent,
  ForgotPasswordComponent,
];
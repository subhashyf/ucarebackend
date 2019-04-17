import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { UMACComponent } from './umac/umac.component';
import { FullDashModule } from './fulldash/fulldash.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { LoginComponent } from './umac/login/login.component';
import { ForgotPasswordComponent } from './umac/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './umac/reset-password/reset-password.component';

const PAGES_COMPONENTS = [
  PagesComponent,
  UMACComponent,
  LoginComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    FullDashModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { UMACComponent } from './umac/umac.component';
import { LoginComponent } from './umac/login/login.component';
import { ForgotPasswordComponent } from './umac/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './umac/reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullDashComponent } from './fulldash/fulldash.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuardService } from './auth-guard.service';

const _ALL_ROUTES: Routes = [
  {
    path: 'umac',
    component: UMACComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      }
    ]
  },
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'fulldash',
        component: FullDashComponent
      },
      {
        path: 'healthdatatype',
        loadChildren: './healthdatatype/healthdatatype.module#HealthDataTypeModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'provider',
        loadChildren: './provider/provider.module#ProviderModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'device',
        loadChildren: './device/device.module#DeviceModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'service',
        loadChildren: './service/service.module#ServiceModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'package',
        loadChildren: './package/package.module#PackageModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'kit',
        loadChildren: './kit/kit.module#KitModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'order',
        loadChildren: './order/order.module#OrderModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'customer',
        loadChildren: './customer/customer.module#CustomerModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'consumer',
        loadChildren: './consumer/consumer.module#ConsumerModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'healthvault',
        loadChildren: './healthvault/healthvault.module#HealthVaultModule'
      },
      {
        path: 'helpdesk/sos',
        loadChildren: './sos/sos.module#SOSModule'
      },
      {
        path: 'helpdesk/safeme',
        loadChildren: './safeme/safeme.module#SafeMeModule'
      },
      {
        path: 'helpdesk/helpme',
        loadChildren: './helpme/helpme.module#HelpMeModule'
      },
      {
        path: 'helpdesk/bookacab',
        loadChildren: './bookacab/bookacab.module#BookACabModule'
      },
      {
        path: 'helpdesk/doctorappointment',
        loadChildren: './doctorappointment/doctorappointment.module#DoctorAppointmentModule'
      },
      {
        path: 'helpdesk/diagnosticappointment',
        loadChildren: './diagnosticappointment/diagnosticappointment.module#DiagnosticAppointmentModule'
      },
      {
        path: '',
        redirectTo: 'fulldash',
        pathMatch: 'full'
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  }
];

const _NORMAL_ROUTES: Routes = [{
    path: 'iot-dashboard',
    component: DashboardComponent,
  }, {
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: ECommerceComponent,
  }, {
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  }, {
    path: 'test',
    loadChildren: './test/test.module#TestModule',
  }, {
    path: 'modal-overlays',
    loadChildren: './modal-overlays/modal-overlays.module#ModalOverlaysModule',
  }, {
    path: 'extra-components',
    loadChildren: './extra-components/extra-components.module#ExtraComponentsModule',
  }, {
    path: 'bootstrap',
    loadChildren: './bootstrap/bootstrap.module#BootstrapModule',
  }, {
    path: 'maps',
    loadChildren: './maps/maps.module#MapsModule',
  }, {
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',
  }, {
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  }, {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  }, {
    path: 'miscellaneous',
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  }, {
    path: '',
    redirectTo: 'fulldash',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(_ALL_ROUTES)],
  exports: [RouterModule],
  providers: [ AuthGuardService ]
})

export class PagesRoutingModule { }

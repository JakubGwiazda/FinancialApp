import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SettingsComponent } from './app-settings/settings.component';
import { PopUpComponent } from './dashboard/Draggable/pop-up/pop-up.component';
import { LoginPageComponent } from './login/login-page.component';
import { RegisterAccountComponent } from './register-account/register-account.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register-account', component: RegisterAccountComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'transaction', component: TransactionsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'popup', component: PopUpComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
    ],
    canActivate: [AuthGuard]
  },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

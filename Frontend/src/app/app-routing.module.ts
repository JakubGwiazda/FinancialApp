import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SettingsComponent } from './app-settings/settings.component';

const routes: Routes = [
  {path:'dashboard', component: DashboardComponent},
  {path:'transaction', component: TransactionsComponent},
  {path:'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';
import { itemsReducer } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { TrackerEffects } from './store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import environment from '../environments/enviroment.json';
import environmentProd from '../environments/enviroment.prod.json';
import { MatSelectModule } from '@angular/material/select';
import { NotificationService } from './services/notifications/notification-service.service';
import { BASE_PATH as FinancialApiBasePath } from 'crypto-api/model/financial';
import { BASE_PATH as NotificationApiBasePath } from 'crypto-api/model/notification';
import { BASE_PATH as AuthorizationApiBasePath } from 'crypto-api/model/authorization';
import { RegisterAccountComponent } from './register-account/register-account.component';
import { AuthorizationInterceptor } from './interceptors/auth-interceptor.interceptor';
import { MenuComponent } from './pages/menu/menu.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { TableSortingExampleComponent } from './pages/table-sorting-example/table-sorting-example.component';
import { UploadFileDirective } from './pages/common/directives/upload-file.directive';
import { SettingsComponent } from './pages/app-settings/settings.component';
import { DynamicTableComponent } from './pages/common/components/dynamic-table/dynamic-table.component';
import { EditModalComponent } from './pages/app-settings/tables/tracked-pair-table/modals/edit-modal/edit-modal.component';
import { SettingsTableComponent } from './pages/app-settings/tables/settings-table/settings-table.component';
import { TrackedPairTableComponent } from './pages/app-settings/tables/tracked-pair-table/tracked-pair-table.component';
import { EditSettingModalComponent } from './pages/app-settings/tables/settings-table/modals/edit-setting-modal/edit-setting-modal.component';
import { DeleteModalComponent } from './pages/app-settings/tables/tracked-pair-table/modals/delete-modal/delete-modal.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ChartComponent } from './pages/common/components/chart/chart.component';
import { SimpleCardComponent } from './pages/common/components/simple-card/simple-card.component';
import { LoginPageComponent } from './pages/login/login-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoaderComponent } from './pages/common/components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    TransactionsComponent,
    TableSortingExampleComponent,
    UploadFileDirective,
    SettingsComponent,
    DynamicTableComponent,
    EditModalComponent,
    SettingsTableComponent,
    TrackedPairTableComponent,
    EditSettingModalComponent,
    DeleteModalComponent,
    LoginPageComponent,
    RegisterAccountComponent,
    LayoutComponent,
    LoaderComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    HighchartsChartModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatHint,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    DragDropModule,
    ChartComponent,
    StoreModule.forRoot({ cryptoState: itemsReducer }),
    EffectsModule.forRoot([TrackerEffects]),
    SimpleCardComponent,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [
    NotificationService,
    provideHttpClient(withInterceptorsFromDi()),

    // { provide: FinancialApiBasePath, useValue: environment.finanacialApiUrl },
    // {
    //   provide: NotificationApiBasePath,
    //   useValue: environment.notificationApiUrl,
    // },
    // {
    //   provide: AuthorizationApiBasePath,
    //   useValue: environment.authorizationApiUrl,
    // },

    { provide: FinancialApiBasePath, useValue: environmentProd.apiUrl },
    {
      provide: NotificationApiBasePath,
      useValue: environmentProd.apiUrl,
    },
    {
      provide: AuthorizationApiBasePath,
      useValue: environmentProd.apiUrl,
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}

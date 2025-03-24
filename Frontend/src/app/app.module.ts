import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { TransactionsComponent } from './transactions/transactions.component';
import {MatButtonModule} from '@angular/material/button';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { TableSortingExampleComponent } from './table-sorting-example/table-sorting-example.component';
import { UploadFileDirective } from './common/directives/upload-file.directive';
import { SettingsComponent } from './app-settings/settings.component';
import { AppRoutingModule } from './app-routing.module';
import { DynamicTableComponent } from './common/components/dynamic-table/dynamic-table.component';
import { EditModalComponent } from './app-settings/tables/tracked-pair-table/modals/edit-modal/edit-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SettingsTableComponent } from './app-settings/tables/settings-table/settings-table.component';
import { TrackedPairTableComponent } from './app-settings/tables/tracked-pair-table/tracked-pair-table.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EditSettingModalComponent } from './app-settings/tables/settings-table/modals/edit-setting-modal/edit-setting-modal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DraggableWindowComponent } from './dashboard/Draggable/draggable-window/draggable-window.component';
import { StoreModule } from '@ngrx/store';
import { itemsReducer } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { TrackerEffects } from './store/effects';
import { SimpleCardComponent } from './common/components/simple-card/simple-card.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ChartComponent } from './common/components/chart/chart.component';
import environment from '../environments/enviroment.json';
import environmentProd from '../environments/enviroment.prod.json';
import { MatSelectModule } from '@angular/material/select';
import { NotificationService } from './services/notifications/notification-service.service';
import { DeleteModalComponent } from './app-settings/tables/tracked-pair-table/modals/delete-modal/delete-modal.component';
import { BASE_PATH as FinancialApiBasePath } from 'crypto-api/model/financial';
import { BASE_PATH as NotificationApiBasePath} from 'crypto-api/model/notification';
import { LoginPageComponent } from './login/login-page.component';
import { RegisterAccountComponent } from './register-account/register-account.component';

// export function apiConfigFactory (): Configuration {
//   const params: ConfigurationParameters = {
//     basePath: 'https://localhost:7054'
//   }
//   return new Configuration(params);
// }

@NgModule({ declarations: [
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
        DraggableWindowComponent,
        LoginPageComponent,
        RegisterAccountComponent
    ],
    bootstrap: [AppComponent], 
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatCardModule,
        //ApiModule.forRoot(apiConfigFactory),
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
        })
      ],
    providers: [
      NotificationService,
      provideHttpClient(withInterceptorsFromDi()),
      { provide: FinancialApiBasePath, useValue: environment.finanacialApiUrl },
      { provide: NotificationApiBasePath, useValue: environment.notificationApiUrl },
    ] })
export class AppModule { }

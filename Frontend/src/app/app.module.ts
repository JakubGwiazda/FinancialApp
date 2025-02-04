import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApiModule } from 'crypto-api/model/api.module';
import { Configuration, ConfigurationParameters } from 'crypto-api/model/configuration';
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

export function apiConfigFactory (): Configuration {
  const params: ConfigurationParameters = {
    basePath: 'https://localhost:7054'
  }
  return new Configuration(params);
}

@NgModule({ declarations: [
        AppComponent,
        DashboardComponent,
        InfoCardComponent,
        MenuComponent,
        TransactionsComponent,
        TableSortingExampleComponent,
        UploadFileDirective,
        SettingsComponent,
        DynamicTableComponent
    ],
    bootstrap: [AppComponent], 
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatCardModule,
        ApiModule.forRoot(apiConfigFactory),
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
      ],
    providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }

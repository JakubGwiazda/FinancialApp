import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  GetAppSettingsResponse,
  GetTrackedCryptoResponse,
  RemoveTrackedCryptoCmd,
  SettingsService,
  TrackNewCryptoCmd,
} from 'crypto-api/model';
import { Observable, pipe, switchMap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { DynamicTableComponent } from '../common/components/dynamic-table/dynamic-table.component';
import { ITableDefinition, IColumnDefinition } from '../common/interfaces/IColumnConfig';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: false,
})
export class SettingsComponent implements OnInit {
    settingsTableColumns : IColumnDefinition[] = [{
      columnDef:'name',
      header: 'Name', 
      width: '50px',
      cell: (item: GetAppSettingsResponse) => `${item?.name}`
    },
    {
      columnDef:'value',
      header: 'Settings value',
      width: '50px',
      cell: (item: GetAppSettingsResponse) => `${item?.value}`
    }];

   trackedCryptoTableColumns : IColumnDefinition[] = [{
      columnDef:'name',
      header: 'Name', 
      cell: (item: GetTrackedCryptoResponse) => `${item?.cryptoCurrencySymbol}`
    },    
    {
      columnDef:'currency',
      header: 'Currency',
      cell: (item: GetTrackedCryptoResponse) => `${item?.fiatCurrencySymbol}`
    },
    {
      columnDef:'action',
      header: 'Action',
      action: (item: GetTrackedCryptoResponse) => console.log(item)
    },
  ];

  trackedCryptoTable: ITableDefinition = {
    columns: this.trackedCryptoTableColumns,
    dataSource: [],
    displayedColumns: this.trackedCryptoTableColumns.map(p => p.columnDef)
  }

  settingsTable: ITableDefinition = {
    columns: this.settingsTableColumns,
    dataSource: [],
    displayedColumns: this.settingsTableColumns.map(p => p.columnDef)
  }

  constructor(private settingsService: SettingsService) {}

  cryptoSettings = new FormGroup({
    cryptoSymbol: new FormControl('', Validators.required),
    currency: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe((res) => {
      if (res && res.value) {
        this.settingsTable.dataSource = res.value.map(p => ({
          name: p.name,
          value: p.value,
        })) as []; 
      }
    });

    this.settingsService.getTrackerPairs().subscribe((res) => {
      if (res && res.value) {         
        this.trackedCryptoTable.dataSource = res.value.map(p => ({
          id: p.id,
          cryptoCurrencySymbol: p.cryptoCurrencySymbol,
          fiatCurrencySymbol: p.fiatCurrencySymbol,
        })) as [];
      }
      this.cryptoSettings.reset();
    });
  }

  handleAction(item: GetTrackedCryptoResponse) {
    this.removeTrackedPair(item);
  }

  onSubmit() {
    let cmd: TrackNewCryptoCmd = {
      cryptoSymbol: this.cryptoSettings.controls.cryptoSymbol.value,
      fiatSymbol: this.cryptoSettings.controls.currency.value,
    };
    this.settingsService
      .addTracker(cmd)
      .pipe(
        switchMap((response) => {
          return this.settingsService.getTrackerPairs();
        })
      )
      .subscribe((res) => {
        if (res && res.value) {
          this.trackedCryptoTable.dataSource = res.value.map(p => ({
            id: p.id,
            cryptoCurrencySymbol: p.cryptoCurrencySymbol,
            fiatCurrencySymbol: p.fiatCurrencySymbol,
          })) as [];
        }
        this.cryptoSettings.reset();
      });
  }

  removeTrackedPair(item: GetTrackedCryptoResponse){
    this.settingsService.removeTracker({id: item.id})
    .pipe(
      switchMap(res => {
        return this.settingsService.getTrackerPairs();
      })
    ).subscribe((res) => {
      if (res && res.value) {
        this.trackedCryptoTable.dataSource = res.value.map(p => ({
          id: p.id,
          cryptoCurrencySymbol: p.cryptoCurrencySymbol,
          fiatCurrencySymbol: p.fiatCurrencySymbol,
        })) as [];
      }
      this.cryptoSettings.reset();
    });
  }
}

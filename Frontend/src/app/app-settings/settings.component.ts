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
import { ITableDefinition, IColumnDefinition, OperationKind } from '../common/interfaces/IColumnConfig';
import { EditModalComponent } from '../common/components/edit-modal/edit-modal.component';
import { MatDialog } from '@angular/material/dialog';

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
      editable: false,
      cell: (item: GetAppSettingsResponse) => `${item?.name}`
    },
    {
      columnDef:'value',
      header: 'Settings value',
      width: '50px',
      editable: true,
      cell: (item: GetAppSettingsResponse) => `${item?.value}`
    }];

   trackedCryptoTableColumns : IColumnDefinition[] = [{
      columnDef:'name',
      header: 'Name', 
      editable: true,
      cell: (item: GetTrackedCryptoResponse) => `${item?.cryptoCurrencySymbol}`
    },    
    {
      columnDef:'currency',
      header: 'Currency',
      editable: true,
      cell: (item: GetTrackedCryptoResponse) => `${item?.fiatCurrencySymbol}`
    },
    {
      columnDef:'action',
      header: 'Action',
      editable: false,
      actions:[
        {
          label:'Delete',
          operationKind: OperationKind.Remove
        },
        {
          label:'Update',
          operationKind: OperationKind.Update
        }
      ]
    },
  ];

  trackedCryptoTable: ITableDefinition = {
    columns: this.trackedCryptoTableColumns,
    dataSource: [],
    displayedColumns: this.trackedCryptoTableColumns.map(p => p.columnDef),
    dataType: 'TrackedCrypto'
  }

  settingsTable: ITableDefinition = {
    columns: this.settingsTableColumns,
    dataSource: [],
    displayedColumns: this.settingsTableColumns.map(p => p.columnDef),
    dataType: 'AppSettings'
  }

  constructor(private settingsService: SettingsService, public dialog: MatDialog) {}

  cryptoSettings = new FormGroup({
    cryptoSymbol: new FormControl('', Validators.required),
    currency: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe((res) => {
      if (res && res.value) {
        this.settingsTable.dataSource = res.value.map(p => ({
          id: p.id,
          name: p.name,
          value: p.value,
          valueType: p.valueType
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

  handleAction(event: { item: any, operationKind: OperationKind, dataType: string }) {
    switch (event.operationKind)
    {
      case OperationKind.Update:
        if(event.dataType === 'TrackedCrypto'){
          this.openTrackedCryptoEditDialog(event.item)
        }
        break;
      case OperationKind.Remove:
        this.removeTrackedPair(event.item);
    }
  }

  openTrackedCryptoEditDialog(item: any): void {
  
    const dialogRef = this.dialog.open(EditModalComponent, {
      
      data: {item: item}
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log('Updated Row:', result);
    //   }
    // });
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

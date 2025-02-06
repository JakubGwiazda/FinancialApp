import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  GetTrackedCryptoResponse,
  SettingsService,
} from 'crypto-api/model';
import {
  OperationKind,
} from '../common/interfaces/IColumnConfig';
import { EditModalComponent } from '../common/components/edit-modal/edit-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ISettingsTableData } from './tables/settings-table/settings-table.component';
import { ITrackedPairs } from './tables/tracked-pair-table/tracked-pair-table.component';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: false,
})
export class SettingsComponent implements OnInit {
  constructor(
    private settingsService: SettingsService,
    public dialog: MatDialog
  ) {}

  cryptoSettings = new FormGroup({
    cryptoSymbol: new FormControl('', Validators.required),
    currency: new FormControl('', [Validators.required]),
  });

  settingsTableData: ISettingsTableData[] = [];
  trackedCryptoTableData: ITrackedPairs[] = [];

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe((res) => {
      if (res && res.value) {
        this.settingsTableData = res.value.map((p) => ({
          id: p.id,
          name: p.name,
          value: p.value,
          valueType: p.valueType,
        })) as ISettingsTableData[];
      }
    });

    this.settingsService.getTrackerPairs().subscribe((res) => {
      if (res && res.value) {
        this.trackedCryptoTableData = res.value.map((p) => ({
          id: p.id,
          cryptoCurrencySymbol: p.cryptoCurrencySymbol,
          fiatCurrencySymbol: p.fiatCurrencySymbol,
        })) as ITrackedPairs[];
      }
      this.cryptoSettings.reset();
    });
  }

  handleAction(event: {
    item: ITrackedPairs;
    operationKind: OperationKind;
    dataType: string;
  }) {
    switch (event.operationKind) {
      case OperationKind.Update:        
          this.openTrackedCryptoEditDialog(event.item);        
        break;
      case OperationKind.Remove:
        this.removeTrackedPair(event.item);
    }
  }

  openTrackedCryptoEditDialog(item: ITrackedPairs): void {
    const dialogRef = this.dialog.open(EditModalComponent, {
      data: {item},
    });
    
    dialogRef.afterClosed()
    .subscribe((item: ITrackedPairs) =>{
      console.log('updated item data')

      console.log(item)
    })
  }

  onSubmit() {
    // let cmd: TrackNewCryptoCmd = {
    //   cryptoSymbol: this.cryptoSettings.controls.cryptoSymbol.value,
    //   fiatSymbol: this.cryptoSettings.controls.currency.value,
    // };
    // this.settingsService
    //   .addTracker(cmd)
    //   .pipe(
    //     switchMap((response) => {
    //       return this.settingsService.getTrackerPairs();
    //     })
    //   )
    //   .subscribe((res) => {
    //     if (res && res.value) {
    //       this.trackedCryptoTable.dataSource = res.value.map(p => ({
    //         id: p.id,
    //         cryptoCurrencySymbol: p.cryptoCurrencySymbol,
    //         fiatCurrencySymbol: p.fiatCurrencySymbol,
    //       })) as [];
    //     }
    //     this.cryptoSettings.reset();
    //   });
  }

  removeTrackedPair(item: GetTrackedCryptoResponse) {
    // this.settingsService.removeTracker({id: item.id})
    // .pipe(
    //   switchMap(res => {
    //     return this.settingsService.getTrackerPairs();
    //   })
    // ).subscribe((res) => {
    //   if (res && res.value) {
    //     this.trackedCryptoTable.dataSource = res.value.map(p => ({
    //       id: p.id,
    //       cryptoCurrencySymbol: p.cryptoCurrencySymbol,
    //       fiatCurrencySymbol: p.fiatCurrencySymbol,
    //     })) as [];
    //   }
    //   this.cryptoSettings.reset();
    // });
  }
}

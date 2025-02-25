import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  GetTrackedCryptoResponse,
  SettingsService,
  TrackNewCryptoCmd,
  UpdateTrackedPairCmd,
} from 'crypto-api/model';
import {
  OperationKind,
} from '../common/interfaces/IColumnConfig';
import { EditModalComponent } from './tables/tracked-pair-table/modals/edit-modal/edit-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ISettingsTableData } from './tables/settings-table/settings-table.component';
import { filter, switchMap } from 'rxjs';
import { EditSettingModalComponent } from './tables/settings-table/modals/edit-setting-modal/edit-setting-modal.component';
import { ITrackedPairs } from '../common/interfaces/ITrackedPairs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state';
import { getTrackedPairs } from '../store/selectors';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: false,
})
export class SettingsComponent implements OnInit {
  constructor(
    private settingsService: SettingsService,
    public dialog: MatDialog,
    private store: Store<AppState>,
  ) {}

  cryptoSettings = new FormGroup({
    cryptoSymbol: new FormControl('', Validators.required),
    currency: new FormControl('', [Validators.required]),
    collectData: new FormControl(false)
  });

  settingsTableData: ISettingsTableData[] = [];
  trackedCryptoTableData: ITrackedPairs[] = [];
  currentClasses: { [key: string]: boolean } = {};

  ngOnInit(): void {
    this.getAllSettings();
    this.store.select(getTrackedPairs).subscribe(pairs=> 
      {
       this.trackedCryptoTableData = pairs
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


  handleSettingsAction(event: {
    item: ISettingsTableData;
    operationKind: OperationKind;
    dataType: string;
  }){
      switch (event.operationKind) {
        case OperationKind.Update:        
            this.openSettingsEditDialog(event.item);        
          break;
      }
  }

  openTrackedCryptoEditDialog(item: ITrackedPairs): void {
    const dialogRef = this.dialog.open<EditModalComponent, { item: ITrackedPairs }, ITrackedPairs>(EditModalComponent, {
      data: {item},
    });

    dialogRef.afterClosed()
    .pipe(
      filter(data => !!data),
      switchMap(updatedData => this.settingsService.updateTrackedPair({
        id: updatedData?.id,
        collectData: updatedData?.collectData
      })))
    .subscribe(() =>{
      this.getAllTrackedPairs();
    })
  }

  openSettingsEditDialog(item: ISettingsTableData): void {
    const dialogRef = this.dialog.open<EditSettingModalComponent, { item: ISettingsTableData }, ISettingsTableData>(EditSettingModalComponent, {
      data: {item},
    });

    dialogRef.afterClosed()
    .pipe(
      filter(data => !!data),
      switchMap(updatedData => this.settingsService.updateSettings({
        id: updatedData?.id,
        value: updatedData?.value
      })))
    .subscribe(() =>{
      this.getAllSettings();
    })
  }

  onSubmit() {
    this.settingsService
      .addTracker({
        cryptoSymbol: this.cryptoSettings.controls.cryptoSymbol.value,
        fiatSymbol: this.cryptoSettings.controls.currency.value,
        collectData: this.cryptoSettings.controls.collectData.value ?? false,
      })      
      .subscribe(() => {
        this.getAllTrackedPairs();
      });
  }

  removeTrackedPair(item: GetTrackedCryptoResponse) {
    this.settingsService.removeTracker({id: item.id})
    .subscribe((res) => {
      this.getAllTrackedPairs();
    });
  }

  getAllTrackedPairs(){
    this.settingsService.getTrackerPairs().subscribe((res) => {
      if (res && res.value) {
        this.trackedCryptoTableData = res.value.map((p) => ({
          id: p.id,
          cryptoCurrencySymbol: p.cryptoCurrencySymbol,
          fiatCurrencySymbol: p.fiatCurrencySymbol,
          collectData: p.collectData
        })) as ITrackedPairs[];
      }
      this.cryptoSettings.reset();
    });
  }

  getAllSettings(){
    this.settingsService.getSettings().subscribe((res) => {
      if (res && res.value) {
        this.settingsTableData = res.value.map((p) => ({
          id: p.id,
          name: p.name,
          value: p.value,
          valueType: p.valueType,
          description: p.description
        })) as ISettingsTableData[];
      }
    });
  }
}

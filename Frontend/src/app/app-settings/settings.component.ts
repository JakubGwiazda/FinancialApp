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
import { GetAppSettingsResponse, GetTrackedCryptoResponse, SettingsService, TrackNewCryptoCmd } from 'crypto-api/model';
import { Observable, pipe, switchMap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: false,
})
export class SettingsComponent implements OnInit {
  displayedColumns: string[] = ['cryptoSymbol', 'currency'];
  displayedSettingsColumns: string[] = ['name', 'value'];

  dataSource: MatTableDataSource<GetTrackedCryptoResponse> = new MatTableDataSource<GetTrackedCryptoResponse>();
  dataSettingsSource: MatTableDataSource<GetAppSettingsResponse> = new MatTableDataSource<GetAppSettingsResponse>();

  constructor(private settingsService: SettingsService) {}


  cryptoSettings = new FormGroup({
    cryptoSymbol: new FormControl('', Validators.required),
    currency: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe(res => {
      if (res && res.value) {
        this.dataSettingsSource.data = [...res.value];
      }
    })
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
      .subscribe(res => {
        if (res && res.value) {
          this.dataSource.data = [...res.value];
        }
        this.cryptoSettings.reset(); 
      });
      
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

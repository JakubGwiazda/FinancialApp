import { Component, OnInit } from '@angular/core';
import { ICandleData, ICryptoInfoData } from '../common/interfaces/ICryptoInfoData';
import { Observable,  map, of } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: false
})
export class DashboardComponent implements OnInit {

 public infoCards: Observable<ICryptoInfoData[]> = of([]);

 constructor() {

 }

  async ngOnInit() {

  }
}

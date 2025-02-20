import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  ICandleData,
  ICryptoInfoData,
} from '../common/interfaces/ICryptoInfoData';
import { BehaviorSubject, Observable, map, of, switchMap, take, tap } from 'rxjs';
import { CryptoDataService, SettingsService, TimePeriod } from 'crypto-api/model';
import {
  createChart,
  LineSeries,
  LineData,
  Time,
  CrosshairMode,
} from 'lightweight-charts';
import { Store } from '@ngrx/store';
import { getPriceChanges, getTrackedItems } from '../store/actions';
import { ITrackedPairs } from '../common/interfaces/ITrackedPairs';
import { getTrackedPairs, selectPriceChanges } from '../store/selectors';
import { AppState } from '../store/state';
import { IPriceChanges } from '../store/reducers';
import { TimePeriodEnum } from '../common/enums/TimePeriodEnum';
import { LocalNotifications } from '@capacitor/local-notifications';

export interface ChartData {
  id: number;
  title: string;
  data: LineData[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false,
})
export class DashboardComponent implements OnInit {
  @ViewChildren('chartContainer') chartContainers!: QueryList<ElementRef>;
  charts = new BehaviorSubject<ChartData[]>([]);
  public infoCards: Observable<ICryptoInfoData[]> = of([]);
  private newWindow: Window | null = null;
  trackedPairs: ITrackedPairs[] = [];
  timeRanges: Record<TimePeriodEnum,string>={
    [TimePeriodEnum.h1]: '1 Hour',
    [TimePeriodEnum.h3]: '3 Hours',
    [TimePeriodEnum.h6]: '6 Hours',
    [TimePeriodEnum.h12]: '12 Hours',
    [TimePeriodEnum.d1]: '1 Day',
    [TimePeriodEnum.d3]: '3 Days',
    [TimePeriodEnum.d6]: '6 Days',
    [TimePeriodEnum.d15]: '15 Days',
    [TimePeriodEnum.d30]: '30 Days'
  }

  constructor(
    private store: Store<AppState>
  ) {}

  setNewWindow(windowRef: Window) {
    this.newWindow = windowRef;
  }

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data.opened) {
      console.log('Nowe okno zostało otwarte!');
    }

    if (event.data.closed) {
      console.log('Nowe okno zostało zamknięte!');
      this.newWindow = null;
    }
  }
  color: boolean = true;
  changeColor() {
    if (this.newWindow && !this.newWindow.closed) {
      if (this.color) {
        this.newWindow.postMessage({ background: 'lightgreen' }, '*');
        this.color = !this.color;
      } else {
        this.newWindow.postMessage({ background: 'blue' }, '*');
        this.color = !this.color;
      }
    }
  }
  
  async ngOnInit() {
    this.store.dispatch(getTrackedItems());
    this.downloadChartsData(TimePeriodEnum.d6);

    const permStatus = await LocalNotifications.requestPermissions();

    if (permStatus.display === 'granted') {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Powiadomienie tytuł',
            body: 'To jest treść powiadomienia.',
            id: 1,
            schedule: { at: new Date(new Date().getTime() + 1000) }, // Po 1 sekundzie
            sound: 'default',
            actionTypeId: '',
            extra: null
          }
        ]
      });
    } else {
      console.log('Permission to receive notifications denied');
    }
  }

  setDataPeriod(period: string){
    this.downloadChartsData(Number.parseInt(period));
  }

  downloadChartsData(period: TimePeriodEnum){
    this.store.select(getTrackedPairs).pipe(
      switchMap((pairs) => {
        this.store.dispatch(getPriceChanges({ items: pairs, timePeriod: period }));        
        return this.store.select(selectPriceChanges);
      })
    ).subscribe((p) => {
      this.charts.next(this.convertToLineChartData(p));
    });
  }

  convertToLineChartData(data: Record<number, IPriceChanges[]>): ChartData[] {
    let mappedData = Object.entries(data).map(([key, value]) => {
      let chartData = value.map(
        (p) =>
          ({
            value: p.price,
            time: this.convertDataToUNIXSeconds(p.data),
          } as LineData)
      );
      let returnData = {
        id: Number(key),
        data: chartData,
        title: value.at(0)?.cryptoName,
      } as ChartData;
      return returnData;
    });
    return mappedData;
  }

  convertDataToUNIXSeconds(data: string): number {
    return Math.floor(new Date(data).getTime() / 1000);
  }


}

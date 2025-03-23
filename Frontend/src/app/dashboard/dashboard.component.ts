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
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  map,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
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
import { FormControl } from '@angular/forms';
import { NotificationService } from '../services/notifications/notification-service.service';

export interface ChartData {
  id: number;
  title: string;
  priceChange: number;
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

  selectedTimeRange = new FormControl(TimePeriodEnum.d3);

  timeRanges: { Key: number; Value: string }[] = [
    { Key: TimePeriodEnum.h1, Value: '1 Hour' },
    { Key: TimePeriodEnum.h3, Value: '3 Hours' },
    { Key: TimePeriodEnum.h6, Value: '6 Hours' },
    { Key: TimePeriodEnum.h12, Value: '12 Hours' },
    { Key: TimePeriodEnum.d1, Value: '1 Day' },
    { Key: TimePeriodEnum.d3, Value: '3 Days' },
    { Key: TimePeriodEnum.d6, Value: '6 Days' },
    { Key: TimePeriodEnum.d15, Value: '15 Days' },
    { Key: TimePeriodEnum.d30, Value: '30 Days' },
  ];

  constructor(
    private store: Store<AppState>,
    public notification: NotificationService
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
    await LocalNotifications.requestPermissions();

    this.store.dispatch(getTrackedItems());
    this.downloadChartsData(TimePeriodEnum.d6);

    this.selectedTimeRange.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => this.downloadChartsData(value!));
  }

  setDataPeriod(period: string) {
    this.downloadChartsData(Number.parseInt(period));
  }

  downloadChartsData(period: TimePeriodEnum) {
    this.store
      .select(getTrackedPairs)
      .pipe(
        switchMap((pairs) => {
          this.store.dispatch(
            getPriceChanges({ items: pairs, timePeriod: period })
          );
          return this.store.select(selectPriceChanges);
        })
      )
      .subscribe((p) => {
        this.charts.next(this.convertToLineChartData(p));
      });
  }

  convertToLineChartData(data: Record<number, IPriceChanges>): ChartData[] {
    let mappedData = Object.entries(data).map(([key, value]) => {
      let chartData = value.priceInfo.map(
        (p) =>
          ({
            value: p.price,
            time: this.convertDataToUNIXSeconds(p.data),
          } as LineData)
      );
      let returnData = {
        id: Number(key),
        data: chartData,
        title: value.cryptoName,
        priceChange: value.priceChange,
      } as ChartData;
      return returnData;
    });
    return mappedData;
  }

  convertDataToUNIXSeconds(data: string): number {
    return Math.floor(new Date(data).getTime() / 1000);
  }
}

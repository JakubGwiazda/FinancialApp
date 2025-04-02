import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ICryptoInfoData } from '../common/interfaces/ICryptoInfoData';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  filter,
  of,
  switchMap,
} from 'rxjs';
import { LineData } from 'lightweight-charts';
import { Store } from '@ngrx/store';
import { ITrackedPairs } from '../common/interfaces/ITrackedPairs';
import { TimePeriodEnum } from '../common/enums/TimePeriodEnum';
import { FormControl } from '@angular/forms';
import { AppState } from 'src/app/store/state';
import {
  getPriceChanges,
  getTrackedItems,
} from 'src/app/store/actions';
import { getTrackedPairs, selectPriceChanges } from 'src/app/store/selectors';
import { IPriceChanges } from 'src/app/store/reducers';

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
  trackedPairs: ITrackedPairs[] = [];
  loadingData: boolean = false;

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
  ) {}

  async ngOnInit() {
    this.store.dispatch(getTrackedItems());
    await this.downloadChartsData(TimePeriodEnum.d6);

    this.selectedTimeRange.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => this.downloadChartsData(value!));
  }

  setDataPeriod(period: string) {
    this.downloadChartsData(Number.parseInt(period));
  }

  async downloadChartsData(period: TimePeriodEnum) {
    this.loadingData = true;

    this.store
      .select(getTrackedPairs)
      .pipe(
        filter((pairs) => pairs.length > 0),
        switchMap((pairs) => {
          this.store.dispatch(
            getPriceChanges({ items: pairs, timePeriod: period })
          );
          return this.store.select(selectPriceChanges);
        }),
        filter((prices) => Object.keys(prices).length > 0)
      )
      .subscribe((p) => {
        this.charts.next(this.convertToLineChartData(p));
        this.loadingData = false;
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

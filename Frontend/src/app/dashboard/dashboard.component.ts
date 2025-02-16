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
import { BehaviorSubject, Observable, map, of, switchMap, take } from 'rxjs';
import { CryptoDataService, SettingsService } from 'crypto-api/model';
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

  constructor(
    private service: CryptoDataService,
    private settingsService: SettingsService,
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

  generateCharts(){
    // this.createCharts(this.charts.value[0]);
    // this.createCharts(this.charts.value[1]);
  }

  async ngOnInit() {
    this.store.dispatch(getTrackedItems());
    this.store.select(getTrackedPairs).subscribe((pairs) => {
      this.store.dispatch(getPriceChanges({ items: pairs }));
      this.store.select(selectPriceChanges).subscribe((p) => {
         this.charts.next(this.convertToLineChartData(p));
         
      });
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

  // createCharts(data: ChartData) {
  //     const chart = createChart(this.chartContainers.get(0)!.nativeElement, {
  //       width: 800,
  //       height: 400,
  //       timeScale: {
  //         timeVisible: true,
  //         secondsVisible: true,
  //         fixLeftEdge: true,
  //         tickMarkFormatter: function (time: number) {
  //           const date = new Date(time * 1000);
  //           const day = String(date.getDate()).padStart(2, '0');
  //           const month = String(date.getMonth() + 1).padStart(2, '0');
  //           const year = date.getFullYear();
  //           const hours = String(date.getUTCHours()).padStart(2, '0');
  //           const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  //           return `${day}.${month}.${year} ${hours}:${minutes}`;
  //         },
  //       },
  //       rightPriceScale: {
  //         borderColor: '#D1D4DC',
  //       },
  //       grid: {
  //         vertLines: { color: '#E1ECF2' },
  //         horzLines: { color: '#E1ECF2' },
  //       },
  //       crosshair: {
  //         mode: CrosshairMode.Normal,
  //       },
  //     });

  //     let lineSeries = chart.addSeries(LineSeries, {
  //       priceScaleId: 'right',
  //       lastValueVisible: true,
  //       priceLineVisible: true,
  //       crosshairMarkerVisible: true,
  //     });

  //     lineSeries.setData(data.data);
  //     chart.timeScale().fitContent();   
  // }

  // createChart(data: LineData[]) {
  //   let chart = createChart(this.chartContainer.nativeElement, {
  //     width: this.chartContainer.nativeElement.clientWidth,
  //     height: 400,
  //     timeScale: {
  //       timeVisible: true,
  //       secondsVisible: true,
  //       fixLeftEdge: true,
  //       tickMarkFormatter: function (time: number) {
  //         const date = new Date(time * 1000);
  //         const day = String(date.getDate()).padStart(2, '0');
  //         const month = String(date.getMonth() + 1).padStart(2, '0');
  //         const year = date.getFullYear();
  //         const hours = String(date.getUTCHours()).padStart(2, '0');
  //         const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  //         return `${day}.${month}.${year} ${hours}:${minutes}`;
  //       },
  //     },
  //     rightPriceScale: {
  //       borderColor: '#D1D4DC',
  //     },
  //     grid: {
  //       vertLines: { color: '#E1ECF2' },
  //       horzLines: { color: '#E1ECF2' },
  //     },
  //     crosshair: {
  //       mode: CrosshairMode.Normal, // Normal crosshair mode
  //     },
  //   });

  //   let lineSeries = chart.addSeries(LineSeries, {
  //     priceScaleId: 'right',
  //     lastValueVisible: true,
  //     priceLineVisible: true,
  //     crosshairMarkerVisible: true,
  //   });

  //   lineSeries.setData(data);
  //   chart.timeScale().fitContent();
  // }
}

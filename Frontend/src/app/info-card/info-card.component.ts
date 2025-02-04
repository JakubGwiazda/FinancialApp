import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { ICandleData, ICryptoInfoData } from '../common/interfaces/ICryptoInfoData';

@Component({
    selector: 'app-info-card',
    templateUrl: './info-card.component.html',
    styleUrls: ['./info-card.component.scss'],
    standalone: false
})
export class InfoCardComponent implements OnInit, OnChanges {

  @Input() cryptoName!: string;
  @Input() price!: number;
  @Input() interval!: number;
  @Input() data!: ICandleData[];
  
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  constructor() {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data'] && this.data){
      this.chartOptions.series =[{
        type: 'candlestick',
        name: 'AAPL',
        data: this.formatDataForChart(this.data),
        tooltip: {
          valueDecimals: 2
        }
      }]
    }
  }

  ngOnInit(): void {
    this.chartOptions = {
      rangeSelector: {
        selected: 1
      },
      title: {
        text: 'Binance Candlestick Data'
      },
      series: [{
        type: 'candlestick',
        name: 'AAPL',
        data: this.formatDataForChart(this.data),
        tooltip: {
          valueDecimals: 2
        }
      }]
    };
  }

  formatDataForChart(data: ICandleData[]): any[] {
    return data.map(candle => [
      candle.openTime,
      candle.openPrice,
      candle.highPrice,
      candle.lowPrice,
      candle.closePrice
    ]);
  }
}
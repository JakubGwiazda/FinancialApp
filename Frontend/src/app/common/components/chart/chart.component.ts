import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { createChart, CrosshairMode, IChartApi, LineData, LineSeries } from 'lightweight-charts';

@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnChanges{
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  @Input() chartData!: LineData[];

  ngOnChanges(): void {
    if (this.chartData && this.chartContainer) {
      this.createChart();
    }
  }

  createChart() {
    const chart = createChart(this.chartContainer.nativeElement, {
      width: this.chartContainer.nativeElement.clientWidth,
      height: Math.min(window.innerHeight * 0.5, 400),
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
        fixLeftEdge: true,
        tickMarkFormatter: function (time: number) {
          const date = new Date(time * 1000);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          const hours = String(date.getUTCHours()).padStart(2, '0');
          const minutes = String(date.getUTCMinutes()).padStart(2, '0');
          return `${day}.${month}.${year}`;
        },
      },
      rightPriceScale: {
        borderColor: '#D1D4DC',
      },
      grid: {
        vertLines: { color: '#E1ECF2' },
        horzLines: { color: '#E1ECF2' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
    });

    let lineSeries = chart.addSeries(LineSeries, {
      priceScaleId: 'right',
      lastValueVisible: true,
      priceLineVisible: true,
      crosshairMarkerVisible: true,
    });

    lineSeries.setData(this.chartData);
    chart.timeScale().fitContent();   

    const resizeChart = () => {
      chart.resize(
        this.chartContainer.nativeElement.clientWidth,
        Math.min(window.innerHeight * 0.5, 400)  // Maksymalnie 50% wysokości ekranu lub 400px
      );
    };

    window.addEventListener('resize', resizeChart);
}
}
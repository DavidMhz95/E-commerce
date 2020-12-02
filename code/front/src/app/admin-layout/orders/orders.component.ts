import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { RandomDate } from 'src/app/app.utils';
// bar-chart.component.ts
import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData
} from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import { Order } from 'black-market-model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public toProcessOrders:Order[] =[]
  public sentOrders:Order[] =[]
  public deliveredOrders:Order[] =[]

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    // this.toProcessOrders = this.dataService.generateRandomOrders(4)
    // this.sentOrders = this.dataService.generateRandomOrders(6)
    // this.deliveredOrders = this.dataService.generateRandomOrders(20)
  }

 

  type: ChartType = 'Line';
  data: IChartistData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 10],
    series: [
      [5, 9, 7, 8, 5, 3, 5, 4]
    ]
  };

  data2: IChartistData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 10],
    series: [
      [0, 6, 20, 12, 4, 0, 0, 3]
    ]
  };

  options: any = {
    low: 0,
    showArea: true,
    height: 52,
    showPoint: false,
    fullWidth: true,
    horizontalBars: true,
    chartPadding: 2,
    axisY: {
      showLabel: false,
      showGrid: false,
      offset: 0
    },
    axisX: {
      showLabel: false,
      showGrid: false,
      offset: 0,
    }
  };

  events: ChartEvent = {
    draw: (data) => {
      if (data.type === 'bar') {
        data.element.animate({
          y2: <IChartistAnimationOptions>{
            dur: '0.5s',
            from: data.y1,
            to: data.y2,
            easing: 'easeOutQuad'
          }
        });
      }
    }
  };

}

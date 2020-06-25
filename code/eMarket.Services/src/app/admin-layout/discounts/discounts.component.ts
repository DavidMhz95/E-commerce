import { Component, OnInit } from '@angular/core';
import { DataService, DiscountType, DiscountCode } from 'src/app/shared/data.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {

  public discount:DiscountCode = {
    application: undefined,
    code: undefined,
    customers: undefined,
    repetitions: undefined,
    type: undefined,
    value: undefined,
    products:undefined,
    section:undefined,
    subsection:undefined,
    minPurchase:undefined,
    color:undefined,
    dateFrom:undefined,
    dateTo:undefined
  }

  constructor(public dataService:DataService) { }

  ngOnInit(): void {

  }

  discountType = DiscountType;

}

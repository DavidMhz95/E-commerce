import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService, DiscountType, DiscountCode, DiscountApplication } from './../../shared/data.service';
import { PickTextColorBasedOnBgColorAdvanced, HexToRgb } from './../../app.utils'

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss'],
})
export class DiscountsComponent implements OnInit {

  
  public discount: DiscountCode

  constructor(public dataService: DataService) {
    this.resetDiscount()
  }

  ngOnInit(): void {

  }

  setLightenDarkenColor(color: string, opacity: number) {
    var result: string
    if (color) {
      var rgb = HexToRgb(color)
      result = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + opacity + ')'
    }
    return result
  }
  
  setBackgroundColor(event: any, color: string) {
    var resultColor = this.setLightenDarkenColor(color ? color : '#000000', 0.1)
    if (event && event.type == 'mouseleave' && event.srcElement instanceof HTMLElement) {
      (event.srcElement as HTMLElement).style.backgroundColor = resultColor
    } else if (event && event.type == 'mouseenter' && event.toElement instanceof HTMLElement) {
      (event.toElement as HTMLElement).style.backgroundColor = resultColor
    }
  }

  saveDiscount() {
    this.discount.code = this.discount.code.toUpperCase()
    const index:number = this.dataService.discounts.indexOf(this.discount)
    if(index ==-1){
      this.dataService.discounts.push(this.discount)
    }
  }

  resetDiscount() {
    this.discount = {
      application: DiscountApplication.All,
      code: undefined,
      customers: undefined,
      repetitions: undefined,
      type: undefined,
      value: undefined,
      products: undefined,
      section: undefined,
      subsection: undefined,
      minPurchase: 0,
      color: '#333333',
      dateFrom: new Date(),
      dateTo: new Date()
    }
  }
  
  setDiscount(discount){
    this.discount = discount
  }

  discountType = DiscountType;
  discountApplication = DiscountApplication;
 
}

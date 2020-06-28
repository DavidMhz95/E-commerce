import { Component, OnInit, Input } from '@angular/core';
import { DiscountCode, DataService, DiscountType, DiscountApplication } from 'src/app/shared/data.service';
import { PickTextColorBasedOnBgColorAdvanced, HexToRgb } from 'src/app/app.utils';

@Component({
  selector: 'app-discount-editor',
  templateUrl: './discount-editor.component.html',
  styleUrls: ['./discount-editor.component.scss']
})
export class DiscountEditorComponent implements OnInit {

  @Input('discount') discount: DiscountCode

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  
  getColor(color: string) {
    if(color){
      return PickTextColorBasedOnBgColorAdvanced(color, '#FFFFFF', '#000000');
    }
  }

  setBackgroundColor(event: any, color: string) {
    var resultColor = this.setLightenDarkenColor(color ? color : '#000000', 0.1)
    if (event && event.type == 'mouseleave' && event.srcElement instanceof HTMLElement) {
      (event.srcElement as HTMLElement).style.backgroundColor = resultColor
    } else if (event && event.type == 'mouseenter' && event.toElement instanceof HTMLElement) {
      (event.toElement as HTMLElement).style.backgroundColor = resultColor
    }
  }

  setLightenDarkenColor(color: string, opacity: number) {
    var result: string
    if (color) {
      var rgb = HexToRgb(color)
      result = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + opacity + ')'
    }
    return result
  }

  selectedCustomer($event) {
    if ($event.value) {
      if (!this.discount.customers) {
        this.discount.customers = []
      }
      this.discount.customers.push($event.value)
      $event.source.value = undefined
    }
  }

  removeFromCustomers(customer) {
    const index: number = this.discount.customers.indexOf(customer);
    if (index !== -1) {
      this.discount.customers.splice(index, 1);
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
  isMinPurchaseEnabled: boolean = false
  isAnyCustomerSelected: boolean = false
  discountType = DiscountType;
  discountApplication = DiscountApplication;
}

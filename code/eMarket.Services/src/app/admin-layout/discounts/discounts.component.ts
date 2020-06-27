import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService, DiscountType, DiscountCode, DiscountApplication } from './../../shared/data.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss'],
})
export class DiscountsComponent implements OnInit {

  isMinPurchaseEnabled: boolean = false
  isAnyCustomerSelected: boolean = false

  public discount: DiscountCode

  constructor(public dataService: DataService) {
    this.resetDiscount()
  }

  ngOnInit(): void {

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

  resetDiscount(){
    this.discount= {
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
      color: undefined,
      dateFrom: new Date(),
      dateTo: new Date()
    }
  }

  saveDiscount(){
    this.discount.code = this.discount.code.toUpperCase()
    this.dataService.discounts.push(this.discount)
  }

  discountType = DiscountType;
  discountApplication = DiscountApplication;
}

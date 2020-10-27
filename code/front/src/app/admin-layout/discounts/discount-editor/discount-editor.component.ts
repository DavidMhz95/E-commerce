import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { ColorService } from 'src/app/shared/color.service';
import { MatDrawer } from '@angular/material/sidenav';
import { DiscountApplication, DiscountCode, DiscountType } from 'src/app/models/discountCode';

@Component({
  selector: 'app-discount-editor',
  templateUrl: './discount-editor.component.html',
  styleUrls: ['./discount-editor.component.scss']
})
export class DiscountEditorComponent implements OnInit {

  @Input('discount') discount: DiscountCode

  constructor(public dataService: DataService, public colorService:ColorService) { }

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

  resetDiscount() {
    this.discount = {
      discountApplication: undefined,
      code: undefined,
      customers: undefined,
      repetitions: undefined,
      discountType: undefined,
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

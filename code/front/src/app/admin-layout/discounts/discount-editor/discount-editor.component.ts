import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { ColorService } from 'src/app/shared/color.service';
import { DiscountCode, DiscountType, DiscountApplication, ObjectType } from 'black-market-model';

@Component({
  selector: 'app-discount-editor',
  templateUrl: './discount-editor.component.html',
  styleUrls: ['./discount-editor.component.scss']
})
export class DiscountEditorComponent implements OnInit {

  @Input('discount') discount: DiscountCode

  constructor(public dataService: DataService, public colorService: ColorService) { }

  ngOnInit(): void {
  }

  selectedCustomer($event: any) {
    if ($event.value) {
      if (!this.discount.users) {
        this.discount.users = []
      }
      this.discount.users.push($event.value)
      $event.source.value = undefined
    }
  }

  removeFromCustomers(customer) {
    const index: number = this.discount.users.indexOf(customer);
    if (index !== -1) {
      this.discount.users.splice(index, 1);
    }
  }

  resetDiscount() {
    this.discount = {
      discountApplication: undefined,
      code: undefined,
      users: undefined,
      repetitions: undefined,
      discountType: undefined,
      value: undefined,
      products: undefined,
      section: undefined,
      subsection: undefined,
      minPurchase: 0,
      color: '#333333',
      dateFrom: new Date(),
      dateTo: new Date(),
      type: ObjectType.DiscountCode
    }
  }
  isMinPurchaseEnabled: boolean = false
  isAnyCustomerSelected: boolean = false
  discountType = DiscountType;
  discountApplication = DiscountApplication;
}

import { Component, OnInit, Input } from '@angular/core'
import { DataService, Customer } from 'src/app/shared/data.service'
import { PaymentType, PaymentTypeEnum } from '../payment-types/payments.component';
import { RandomEnum } from 'src/app/app.utils';
import { CartProduct } from 'src/app/models/cart-product';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {


  @Input('products') products: CartProduct[]
  @Input('customer') customer: Customer
  @Input('location') location: string
  @Input('payment') payment: string
  @Input('paymentType') paymentType: PaymentTypeEnum
  price: number = 0

  constructor() { }
  ngOnInit(): void {
    this.products.forEach((p) => {
      this.price += p.product?.offerPrice * p.number
    })

    this.location = "Calle Falsa 123, Madrid 28045 Madrid (Spain)"
    this.payment = "Tarjeta que termina en 6801"
    this.paymentType = RandomEnum(PaymentTypeEnum) 
  }

}

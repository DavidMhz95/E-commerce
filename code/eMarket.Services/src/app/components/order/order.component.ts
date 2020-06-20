import { Component, OnInit, Input } from '@angular/core'
import { CartProduct } from 'src/app/shared/shopping-cart.service'
import { DataService, Customer } from 'src/app/shared/data.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {


  @Input('products') products:CartProduct[]
  @Input('customer') customer:Customer
  price: number = 0

  constructor() {}
  ngOnInit(): void {
    this.products.forEach((p)=>{
      this.price+=p.product.actualPrize*p.number
    })
  }

}

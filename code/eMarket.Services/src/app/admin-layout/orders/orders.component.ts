import { Component, OnInit } from '@angular/core';
import { Order, DataService } from 'src/app/shared/data.service';
import { CartProduct } from 'src/app/shared/shopping-cart.service';
import { RandomDate } from 'src/app/app.utils';
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
    this.toProcessOrders = this.generateRandomOrders(4)
    this.sentOrders = this.generateRandomOrders(6)
    this.deliveredOrders = this.generateRandomOrders(20)
  }

  generateRandomOrders(number:number):Order[]{
    var result:Order[] = []
    for(var i=0; i<number;i++){
      var randomCustomer =  Math.floor((Math.random() * this.dataService.customers.length))
      var randomProducts = Math.floor((Math.random() * 4)) + 1
      var randomId = Math.floor((Math.random() * 1000000))

      var products:CartProduct[] = []

      for (var j = 0; j < randomProducts; j++) {
        var randomProductId = Math.floor((Math.random() * this.dataService.products.length))
        var randomProductNumber = Math.floor((Math.random() * 2)) + 1
        products.push({
          product: this.dataService.products[randomProductId],
          number: randomProductNumber
        })
      }

      result.push({
        id:randomId,
        customer: this.dataService.customers[randomCustomer],
        products: products,
        date: RandomDate(new Date(2012, 0, 1), new Date()).toLocaleDateString('es-ES')
      })
    }
    return result
  }



}

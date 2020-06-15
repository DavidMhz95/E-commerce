import { Component, OnInit } from '@angular/core';
import { ShoppingCartService, CartProduct } from 'src/app/shared/shopping-cart.service';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/components/product/product.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string[] = ['image', 'name', 'prize', 'number'];
  dataSource: MatTableDataSource<CartProduct>;
  constructor(public cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.cartService.products)
  }

  deleteProduct(product: Product) {
    this.cartService.RemoveProduct(product)
    this.dataSource = new MatTableDataSource(this.cartService.products)
  }

  public valueChanged(event:number, product: CartProduct){
    product.number = event
  }
  
}

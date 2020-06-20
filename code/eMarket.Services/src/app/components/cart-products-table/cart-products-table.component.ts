import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product/product.component';
import { ShoppingCartService, CartProduct } from 'src/app/shared/shopping-cart.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cart-products-table',
  templateUrl: './cart-products-table.component.html',
  styleUrls: ['./cart-products-table.component.scss']
})
export class CartProductsTableComponent implements OnInit {

  @Input('editable') editable:boolean
  @Input('dataSource') dataSource: CartProduct[]

  displayedColumns: string[] = ['image', 'name', 'prize', 'number'];
  public internalDataSource:MatTableDataSource<CartProduct>

  constructor(public cartService: ShoppingCartService) { 

  }

  ngOnInit(): void {
    this.internalDataSource = new MatTableDataSource(this.dataSource)
  }

  deleteProduct(product: Product) {
    this.cartService.RemoveProduct(product)
    this.internalDataSource = new MatTableDataSource(this.dataSource)
  }

  public valueChanged(event:number, product: CartProduct){
    product.number = event
  }
}

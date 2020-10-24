import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingCartService, CartProduct } from 'src/app/shared/shopping-cart.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/servicesForModels/product.service';

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

  constructor(public cartService: ShoppingCartService, public productService: ProductService) { 

  }

  ngOnInit(): void {
    this.internalDataSource = new MatTableDataSource(this.dataSource.filter((product: CartProduct) => product.number > 0))
  }

  deleteProduct(product: Product, removeAll:boolean) {
    this.cartService.RemoveProduct(product, removeAll)
    this.internalDataSource = new MatTableDataSource(this.dataSource.filter((product: CartProduct) => product.number > 0))
  }

  public valueChanged(event:number, product: CartProduct){
    product.number = event

    if(product.number <= 0){
      this.deleteProduct(product.product, true)
    }
  }
}

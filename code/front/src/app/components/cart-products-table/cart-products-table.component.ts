import { Component, OnInit, Input, OnChanges, Sanitizer } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/shopping-cart.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/servicesForModels/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Product, CartProduct } from 'black-market-model';

@Component({
  selector: 'app-cart-products-table',
  templateUrl: './cart-products-table.component.html',
  styleUrls: ['./cart-products-table.component.scss']
})
export class CartProductsTableComponent implements OnInit, OnChanges {

  @Input('editable') editable: boolean
  @Input('dataSource') dataSource: CartProduct[]

  displayedColumns: string[] = ['image', 'name', 'properties', 'prize', 'number'];
  public internalDataSource: MatTableDataSource<CartProduct>

  constructor(public sanitizer: DomSanitizer, public cartService: ShoppingCartService, public productService: ProductService) {
  }

  private _update() {
    if (this.dataSource && this.dataSource.length > 0) {
      this.internalDataSource = new MatTableDataSource(this.dataSource.filter((product: CartProduct) => product.quantity > 0))
    }
  }

  ngOnInit(): void {
    this._update()
  }

  ngOnChanges() {
    this._update()
  }

  getPropertyNames(product: Product) {
    return product.properties.map((p: any) => p.values).join(' ')
  }

  deleteProduct(product: Product, removeAll: boolean) {
    this.cartService.RemoveProduct(product, removeAll)
    this._update()
  }

  public valueChanged(event: number, product: CartProduct) {
    product.quantity = event

    if (product.quantity <= 0) {
      this.deleteProduct(product.product, true)
    }
  }
}

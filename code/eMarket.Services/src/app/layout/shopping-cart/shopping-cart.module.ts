import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart.component';
import { MatTableModule } from '@angular/material/table';
import { ProductDetailsModule } from '../product-details/product-details.module';


@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    MatTableModule,
    ProductDetailsModule
  ]
})
export class ShoppingCartModule { }

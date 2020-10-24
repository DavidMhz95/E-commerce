import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart.component';
import { MatTableModule } from '@angular/material/table';
import { ProductDetailsModule } from '../product-details/product-details.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { ShoppingCartCheckoutComponent } from './shopping-cart-checkout/shopping-cart-checkout.component';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [ShoppingCartComponent, ShoppingCartCheckoutComponent],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    MatTableModule,
    ProductDetailsModule,
    SharedModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    MatCheckboxModule,
  ]
})
export class ShoppingCartModule { }

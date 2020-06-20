import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { QuantitySelectorComponent } from '../components/quantity-selector/quantity-selector.component';
import { ProductComponent } from '../components/product/product.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { OrderComponent } from '../components/order/order.component';
import { MatDividerModule } from '@angular/material/divider';
import { CartProductsTableComponent } from '../components/cart-products-table/cart-products-table.component';
import { MatTableModule } from '@angular/material/table';
import { NoCommaPipe } from './no-comma.pipe';



@NgModule({
  declarations: [
    CarouselComponent, 
    QuantitySelectorComponent, 
    ProductComponent, 
    OrderComponent,
    CartProductsTableComponent,
    NoCommaPipe,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    MatTabsModule,
    MatDividerModule,
    RouterModule,
    MatTableModule
  ],
  exports: [
    CarouselComponent,
    QuantitySelectorComponent,
    ProductComponent,
    OrderComponent,
    CartProductsTableComponent,
    NoCommaPipe
  ]
})
export class SharedModule { }

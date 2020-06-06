import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsViewRoutingModule } from './products-view-routing.module';
import { ProductsViewComponent } from './products-view.component';
import { ProductComponent } from 'src/app/components/product/product.component';


@NgModule({
  declarations: [ProductsViewComponent, ProductComponent],
  imports: [
    CommonModule,
    ProductsViewRoutingModule
  ]
})
export class ProductsViewModule { }

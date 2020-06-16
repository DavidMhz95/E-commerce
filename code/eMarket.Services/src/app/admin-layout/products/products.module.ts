import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import {MatTableModule} from '@angular/material/table';
import { TableProductsComponent } from 'src/app/components/table-products/table-products.component';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [ProductsComponent,TableProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatTableModule,
    MatFormFieldModule,
  ]
})
export class ProductsModule { }

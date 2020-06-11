import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';
import { CarouselComponent } from 'src/app/components/carousel/carousel.component';
import { QuantitySelectorComponent } from 'src/app/components/quantity-selector/quantity-selector.component';
import { FormsModule } from '@angular/forms';



@NgModule({
    
  declarations: [ProductDetailsComponent, CarouselComponent,QuantitySelectorComponent],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    MatIconModule,
    FormsModule
  ],
  exports:[
    ProductDetailsComponent,
    CarouselComponent,
    QuantitySelectorComponent
  ]
})
export class ProductDetailsModule { }

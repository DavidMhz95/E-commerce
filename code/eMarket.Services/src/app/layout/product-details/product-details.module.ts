import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';
import { CarouselComponent } from 'src/app/components/carousel/carousel.component';



@NgModule({
    
  declarations: [ProductDetailsComponent, CarouselComponent],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,

  ],
  exports:[
    ProductDetailsComponent
  ]
})
export class ProductDetailsModule { }

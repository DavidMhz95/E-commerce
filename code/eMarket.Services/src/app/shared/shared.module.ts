import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { QuantitySelectorComponent } from '../components/quantity-selector/quantity-selector.component';
import { ProductComponent } from '../components/product/product.component';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CarouselComponent,QuantitySelectorComponent, ProductComponent, ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    MatTabsModule,
    RouterModule
  ],
  exports:[
    CarouselComponent,
    QuantitySelectorComponent,
    ProductComponent
  ]
})
export class SharedModule { }

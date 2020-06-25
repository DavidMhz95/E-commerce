import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';
import { FormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
    
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    MatIconModule,
    FormsModule,
    MatTabsModule,
    SharedModule,
    MatDialogModule
    
  ],
  exports:[
    ProductDetailsComponent,
  ]
 })
export class ProductDetailsModule { }

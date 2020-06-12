import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsViewRoutingModule } from './products-view-routing.module';
import { ProductsViewComponent } from './products-view.component';
import { ProductComponent } from 'src/app/components/product/product.component';
import { ProductModalComponent } from 'src/app/components/product-modal/product-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductDetailsModule } from '../product-details/product-details.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  imports: [
    CommonModule,
    ProductsViewRoutingModule,
    MatDialogModule,
    ProductDetailsModule,
    InfiniteScrollModule,
    MatProgressBarModule,
  ],
  declarations: [
    ProductsViewComponent,
    ProductComponent,
    ProductModalComponent
  ],
  entryComponents: [
    ProductModalComponent
  ],
})
export class ProductsViewModule { }

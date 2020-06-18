import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsViewRoutingModule } from './products-view-routing.module';
import { ProductsViewComponent } from './products-view.component';
import { ProductModalComponent } from 'src/app/components/product-modal/product-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductDetailsModule } from '../product-details/product-details.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatTabsModule } from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductsPipe } from './products.pipe';


@NgModule({
  imports: [
    CommonModule,
    ProductsViewRoutingModule,
    MatDialogModule,
    ProductDetailsModule,
    InfiniteScrollModule,
    MatProgressBarModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    SharedModule
  ],
  declarations: [
    ProductsViewComponent,
    ProductModalComponent,
    ProductsPipe
  ],
  entryComponents: [
    ProductModalComponent
  ],
})
export class ProductsViewModule { }

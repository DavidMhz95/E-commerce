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
import { PaymentTypesModule } from '../components/payment-types/payments.module';
import { FilterDuplicatesPipe } from './filter-duplicates.pipe';
import { HeaderOrderComponent } from '../components/header-order/header-order.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TicketComponent } from '../components/ticket/ticket.component';
import { MatCardModule } from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';



@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    FormsModule,
    MatTabsModule,
    MatDividerModule,
    MatTooltipModule,
    MatCardModule,
    RouterModule,
    MatTableModule,
    PaymentTypesModule,
    MatMenuModule
  ],
  declarations: [
    CarouselComponent,
    QuantitySelectorComponent,
    ProductComponent,
    TicketComponent,
    OrderComponent,
    CartProductsTableComponent,
    NoCommaPipe,
    FilterDuplicatesPipe,
    HeaderOrderComponent,
    HeaderComponent,
    FooterComponent,
  ],
  exports: [
    CarouselComponent,
    QuantitySelectorComponent,
    ProductComponent,
    TicketComponent,
    OrderComponent,
    CartProductsTableComponent,
    NoCommaPipe,
    FilterDuplicatesPipe,
    HeaderOrderComponent,
    HeaderComponent,
    FooterComponent,
  ],
})
export class SharedModule { }

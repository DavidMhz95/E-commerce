import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderSectionsComponent } from '../components/header-sections/header-sections.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { SharedModule } from '../shared/shared.module';
import { PaymentTypesModule } from '../components/payment-types/payments.module';


@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatIconModule,
    MatBadgeModule,
    PaymentTypesModule,
    SharedModule,
  ],
  declarations: [
    LayoutComponent,
    HeaderSectionsComponent,   
  ],
})
export class LayoutModule { }

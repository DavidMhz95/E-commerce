import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountsRoutingModule } from './discounts-routing.module';
import { DiscountsComponent } from './discounts.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [DiscountsComponent],
  imports: [
    CommonModule,
    DiscountsRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class DiscountsModule { }

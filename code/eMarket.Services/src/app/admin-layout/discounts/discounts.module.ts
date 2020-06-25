import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountsRoutingModule } from './discounts-routing.module';
import { DiscountsComponent } from './discounts.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [DiscountsComponent],
  imports: [
    CommonModule,
    SharedModule,
    DiscountsRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule, 
    MatCardModule,
    FormsModule,
    MatSelectModule
  ]
})
export class DiscountsModule { }

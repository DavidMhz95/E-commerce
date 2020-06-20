import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChartistModule } from 'ng-chartist';


@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    ChartistModule,
  ]
})
export class CustomersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent, CustomerHistoryDialog } from './customers.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChartistModule } from 'ng-chartist';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [CustomersComponent, CustomerHistoryDialog],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    ChartistModule,
    MatExpansionModule,
    SharedModule
  ]
})
export class CustomersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import {MatTableModule} from '@angular/material/table';
import { TableProductsComponent, DialogOverviewExampleDialog } from 'src/app/components/table-products/table-products.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [ProductsComponent,TableProductsComponent, DialogOverviewExampleDialog],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatRadioModule,
    MatTooltipModule,
    MatSelectModule
    
    
  ]
})
export class ProductsModule {}
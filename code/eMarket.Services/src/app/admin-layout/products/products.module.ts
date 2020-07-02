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
import { TypeProductTableComponent } from 'src/app//components/type-product-table/type-product-table.component';
import { PropertiesProductTableComponent } from 'src/app/components/properties-product-table/properties-product-table.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import { TypeOfProductTableComponent } from './type-of-product-table/type-of-product-table.component';




@NgModule({
  declarations: [ProductsComponent,TableProductsComponent, DialogOverviewExampleDialog,PropertiesProductTableComponent,
    TypeProductTableComponent,
    TypeOfProductTableComponent],

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
    MatSelectModule,
    MatSidenavModule,
    SharedModule,
    MatButtonToggleModule,
    MatCardModule,
    FormsModule,
    MatChipsModule
  ]
})
export class ProductsModule {}
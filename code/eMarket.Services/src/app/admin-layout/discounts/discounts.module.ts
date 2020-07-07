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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { DiscountEditorComponent } from './discount-editor/discount-editor.component';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [DiscountsComponent, DiscountEditorComponent],
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
    MatSelectModule,
    MatCheckboxModule,
    MatDividerModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    ColorPickerModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule, 
    MatTooltipModule
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]
})
export class DiscountsModule { }

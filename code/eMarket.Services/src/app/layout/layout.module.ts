import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderOrderComponent } from '../components/header-order/header-order.component';
import { HeaderComponent } from '../components/header/header.component';
import { HeaderSectionsComponent } from '../components/header-sections/header-sections.component';
import { FooterComponent } from '../components/footer/footer.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderOrderComponent,
    HeaderComponent,
    HeaderSectionsComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
  ]
})
export class LayoutModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderOrderComponent } from '../components/header-order/header-order.component';
import { HeaderComponent } from '../components/header/header.component';
import { HeaderSectionsComponent } from '../components/header-sections/header-sections.component';
import { FooterComponent } from '../components/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatIconModule,
    MatBadgeModule,
    
  ],
  declarations: [
    LayoutComponent,
    HeaderOrderComponent,
    HeaderComponent,
    HeaderSectionsComponent,
    FooterComponent,
  ],
})
export class LayoutModule { }

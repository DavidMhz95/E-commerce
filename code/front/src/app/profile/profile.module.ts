import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { PaymentTypesModule } from '../components/payment-types/payments.module';
import { ProfileOrdersComponent } from './profile-orders/profile-orders.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ProfileComponent, ProfileOrdersComponent, ProfileInfoComponent, ProfileAccountComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    PaymentTypesModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    SharedModule, 
    MatSnackBarModule
  ]
})
export class ProfileModule { }

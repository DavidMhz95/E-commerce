import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { FormsModule } from '@angular/forms';
import { userService } from 'src/app/servicesForModels/user.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [userService]
})
export class RegistrationModule { }

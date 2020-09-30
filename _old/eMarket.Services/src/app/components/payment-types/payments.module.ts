import { AmericanExpress, ApplePay, GooglePay, Maestro, MasterCard, PayPal, Visa, PaymentType } from './payments.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
      AmericanExpress,
      ApplePay,
      GooglePay,
      Maestro,
      MasterCard,
      PayPal,
      Visa,
      PaymentType
    ],
    imports: [
      CommonModule
    ],
    exports: [
        AmericanExpress,
        ApplePay,
        GooglePay,
        Maestro,
        MasterCard,
        PayPal,
        Visa,
        PaymentType
    ]
  })
  export class PaymentTypesModule { }
  
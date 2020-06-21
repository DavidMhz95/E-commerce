import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'american-express',
  templateUrl: './american-express.html',
  styleUrls: ['./payments.component.scss']
})
export class AmericanExpress {}

@Component({
  selector: 'apple-pay',
  templateUrl: './apple-pay.html',
  styleUrls: ['./payments.component.scss']
})
export class ApplePay {}

@Component({
  selector: 'google-pay',
  templateUrl: './google-pay.html',
  styleUrls: ['./payments.component.scss']
})
export class GooglePay {}

@Component({
  selector: 'maestro',
  templateUrl: './maestro.html',
  styleUrls: ['./payments.component.scss']
})
export class Maestro {}

@Component({
  selector: 'mastercard',
  templateUrl: './mastercard.html',
  styleUrls: ['./payments.component.scss']
})
export class MasterCard {}

@Component({
  selector: 'paypal',
  templateUrl: './paypal.html',
  styleUrls: ['./payments.component.scss']
})
export class PayPal {}

@Component({
  selector: 'visa',
  templateUrl: './visa.html',
  styleUrls: ['./payments.component.scss']
})
export class Visa {}

@Component({
  selector: 'app-payment',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentType{
  @Input('type') type:PaymentTypeEnum
  enumType = PaymentTypeEnum
}

export enum PaymentTypeEnum{
  Visa,
  PayPal,
  MasterCard,
  Maestro,
  GooglePay,
  ApplePay,
  AmericanExpress
}
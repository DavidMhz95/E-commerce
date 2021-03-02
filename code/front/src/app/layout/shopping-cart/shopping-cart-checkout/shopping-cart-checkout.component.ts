import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/shopping-cart.service';
import { UserService } from 'src/app/servicesForModels/user.service';
import { OrderService } from 'src/app/servicesForModels/order.service';
import { CopyObject } from 'src/app/app.utils';
import { forkJoin, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DiscountCodeService } from 'src/app/servicesForModels/discountCode.service';
import { Order, Address, PaymentInfo, DiscountType, DiscountCode, ObjectType } from 'black-market-model'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigurationService } from 'src/app/servicesForModels/configuration.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-shopping-cart-checkout',
  templateUrl: './shopping-cart-checkout.component.html',
  styleUrls: ['./shopping-cart-checkout.component.scss']
})
export class ShoppingCartCheckoutComponent implements OnInit {

  order: Order = new Order(ObjectType.Order)
  address: Address = new Address()
  paymentInfo: PaymentInfo = new PaymentInfo()
  discount: string
  isDiscountValid: boolean
  finalPrice: number
  finalPriceDiscount: number

  saveShippingInformation: boolean = false
  savePaymenInformation: boolean = false

  shipmentTypes: any[] = [{ type: 'Estándar', value: 0, price: 3.95, details: "2-3 Días laborables" },
  { type: 'Express', value: 1, price: 6.99, details: "24 Horas" }];

  shippingCost: number = 0;

  constructor(public cartService: ShoppingCartService, public userService: UserService,
    private orderService: OrderService, private discountServide: DiscountCodeService, private router: Router, private _snackBar: MatSnackBar, public configurationService: ConfigurationService, public dataService: DataService) { }



  ngOnInit(): void {
    this.order.user = this.userService.loggedUser
    if (this.order.user && this.order.user.address) {
      this.address = CopyObject(this.order.user.address)
    }
    if (this.order.user && this.order.user.payment) {
      this.paymentInfo = CopyObject(this.order.user.payment)
    }
    this.order.products = this.cartService.products
    this.order.typeShipment = this.shipmentTypes[0]
    


    this.configurationService.getConfiguration().subscribe(
      response => {
        if (response) {
          this.shippingCost = response[0].shippingCosts
          this.finalPrice = this.cartService.GetPrize() + this.shippingCost
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  orderSubmit() {
    if (this.saveShippingInformation) {
      this.order.user.address = this.address
    }
    if (this.savePaymenInformation) {
      this.order.user.payment = this.paymentInfo
    }

    let requests: Observable<any>[] = [this.orderService.create(this.order)]
    if (this.saveShippingInformation || this.savePaymenInformation) {
      requests.push(this.userService.updateUser(this.order.user))
    }
    forkJoin(requests).subscribe((responses) => {
      this.openSnackBar("Pedido realizado", "Aceptar")
      this.cartService.products = []
      this.router.navigate(['/profile'])
    }, error => {
      console.error(error)
    })
  }


  public shipmentDiscount: number = 0
  public lookForDiscount(discountName) {
    var discount: DiscountCode
    this.isDiscountValid = undefined
    if (discountName) {
      this.discountServide.checkDiscountCode(this.discount).subscribe((result: DiscountCode) => {
        this.isDiscountValid = result != undefined
        if (this.isDiscountValid) {

          discount = this.dataService.discountCodes.filter(e => e.code == discountName)[0]
          if (discount) {
            if (discount.discountApplication == "Envio") {
              this.cartService.useDiscount(discount, this.shippingCost)
            } else {
              this.cartService.useDiscount(discount)
            }

          }
          console.log("hola")
          this.shipmentDiscount = this.cartService.getDiscountPriceUpdated(this.shippingCost)
          this.finalPriceDiscount = this.cartService.calculateTotal(this.shippingCost)

        }

      }, err => {
        this.isDiscountValid = false
        this.finalPrice = this.cartService.GetPrize() + this.shippingCost
      })



    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}



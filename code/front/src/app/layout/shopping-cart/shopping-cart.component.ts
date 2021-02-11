import { Component, OnInit } from '@angular/core';
import { DiscountCode } from 'black-market-model';
import { ConfigurationService } from 'src/app/servicesForModels/configuration.service';
import { DiscountCodeService } from 'src/app/servicesForModels/discountCode.service';
import { UserService } from 'src/app/servicesForModels/user.service';
import { DataService } from 'src/app/shared/data.service';
import { ShoppingCartService } from 'src/app/shared/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(public cartService: ShoppingCartService, public userService: UserService, public dataService: DataService, public discountCodeService: DiscountCodeService, public configurationService: ConfigurationService) { }

  private isUserLog: boolean = false
  public discountName : string 
  public shippingCost: number



  ngOnInit(): void {
   this.isUserLog = this.userService.loggedUser? true: false

   if(this.dataService.discountCodes.length==0){

    this.discountCodeService.getAll().subscribe(
      response => {
        if (response) {
          this.dataService.discountCodes = response
          console.log(this.dataService.discountCodes)
        }
      },
      error => {
        console.log(error)
      }
    )
   }

   this.configurationService.getConfiguration().subscribe(
    response => {
      if (response) {
        console.log(response)
        this.shippingCost = response[0].shippingCosts
        this.calculateTotal()
      }
    },
    error => {
      console.log(error)
    }
  )


  }

  public totalPrize: number

  public calculateTotal(){

    var partialPrize: any = !this.cartService?.price ? this.cartService?.GetPrize().toFixed(2) : this.cartService?.price
    var shippingPrize: any = this.cartService?.discountPrice ? this.cartService?.discountPrice : this.shippingCost 
    console.log(partialPrize,shippingPrize)
    this.totalPrize = Number(shippingPrize) + Number(partialPrize)

  }

  public lookForDiscount(discountName){
    var discount: DiscountCode
    if(discountName){
      discount = this.dataService.discountCodes.filter(e => e.code==discountName)[0]
      if(discount){
        if(discount.discountApplication=="Envio"){
          this.cartService.useDiscount(discount,this.shippingCost)
        }else{
          this.cartService.useDiscount(discount)
        }
        
      }

      this.calculateTotal()
      
    }
  }

}

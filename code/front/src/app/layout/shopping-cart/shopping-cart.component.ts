import { Component, OnInit } from '@angular/core';
import { DiscountCode } from 'black-market-model';
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

  constructor(public cartService: ShoppingCartService, public userService: UserService, public dataService: DataService, public discountCodeService: DiscountCodeService) { }

  private isUserLog: boolean = false
  public discountName : string 



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
   
   console.log(this.isUserLog, this.userService.loggedUser)
  }

  public lookForDiscount(discountName){
    var discount: DiscountCode
    if(discountName){
      discount = this.dataService.discountCodes.filter(e => e.code==discountName)[0]
      if(discount){
        this.cartService.useDiscount(discount)
      }
      
    }
  }

}

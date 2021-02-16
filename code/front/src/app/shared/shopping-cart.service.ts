import { Injectable } from '@angular/core';
import { CartProduct, DiscountCode, Product, User } from 'black-market-model';
import { UserService } from '../servicesForModels/user.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private BM_Cart: string = "BM_Cart"
  private totalPrice: number = 0
  private totalElements: number = 0
  public isDiscount: boolean = false

  public products: CartProduct[] = []

  constructor(public userService: UserService) {
    const serializedProducts = localStorage.getItem(this.BM_Cart)
    this.products = serializedProducts ? JSON.parse(serializedProducts) : []
  }

  public AddProduct(product: Product, userProduct: Product, value: number) {
    var found: boolean

    this.products.forEach((p: CartProduct) => {
      if (p.product.reference == product.reference && JSON.stringify(p.product.properties) === JSON.stringify(userProduct.properties)) {
        if (value) {
          p.quantity += value
        } else {
          p.quantity++
        }
        found = true
      }
    })

    if (!found) {
      this.products.push({
        product: userProduct,
        quantity: value
      })
    }

    localStorage.setItem(this.BM_Cart, JSON.stringify(this.products))
  }

  public RemoveProduct(product: Product, removeAll: boolean) {
    this.products.forEach((p: CartProduct) => {
      if (p.product.reference == product.reference) {
        if (removeAll) {
          p.quantity = 0
        } else {
          p.quantity--
        }
      }
    })
    this.products = this.products.filter((prod: CartProduct) => prod.quantity > 0)
    localStorage.setItem(this.BM_Cart, JSON.stringify(this.products))

  }

  public GetPrize(): number {
    this.totalPrice = 0;
    this.products.forEach((element: CartProduct) => {
      if (element.product.offerPrice) {
        this.totalPrice += element.product.offerPrice * element.quantity
      } else {
        this.totalPrice += element.product.price * element.quantity
      }
    })
    
    return this.totalPrice
  }

  public GetElements(): string {
    this.totalElements = 0;
    this.products.forEach((element: CartProduct) => {
      this.totalElements += element.quantity
    })
    return this.totalElements.toFixed(0)
  }

  public useDiscount(discount: DiscountCode) {
    var currentTime = this.getToday()
    var dateFrom = discount.dateFrom.toString().split("T")[0]
    var dateTo = discount.dateTo.toString().split("T")[0]

    //Comprobamos si tiene compra mínima 
    if (discount.minPurchase) {
      //  El periodo de validez es correcto y el valor minimo tambien
      if (this.totalPrice >= discount.minPurchase && Date.parse(dateFrom) <= Date.parse(currentTime) && Date.parse(dateTo) >= Date.parse(currentTime)) {
        this.checkUsersDiscount(discount)
      } else {
        alert("Las condiciones del descuento no se cumplen")
      }
    } else {
      //  El periodo de validez es correcto
      if (Date.parse(dateFrom) <= Date.parse(currentTime) && Date.parse(dateTo) >= Date.parse(currentTime)) {
        this.checkUsersDiscount(discount)
      } else {
        alert("Las condiciones del descuento no se cumplen")
      }
    }
  }

  public getToday() {
    let today: any = new Date()
    let dd: any = today.getDate()

    let mm = today.getMonth() + 1
    const yyyy = today.getFullYear()
    if (dd < 10) {
      dd = `0${dd}`
    }

    if (mm < 10) {
      mm = `0${mm}`
    }
    today = `${yyyy}-${mm}-${dd}`
    return today
  }

  public checkUsersDiscount(discount:DiscountCode) {
    var sessionUser: User = this.userService.loggedUser
    //Comprobamos permisos del descuento sobre usuarios
    if (discount.users) {
      discount.users.forEach(user => {
        if (user.email == sessionUser.email) {
          this.applyDiscount(discount);
        }
      });
    } else {
      this.applyDiscount(discount);
    }
  }

  public prize: number = 0

  private applyDiscount(discount: DiscountCode) {
    this.isDiscount = true
    //Comprobamos el tipo de descuento
    if (discount.discountType == "Porcentaje") {
      this.prize = this.totalPrice - (this.totalPrice * discount.value / 100) 
    } else if (discount.discountType == "Valor") {
      this.prize = this.totalPrice - discount.value
    }
  }
}



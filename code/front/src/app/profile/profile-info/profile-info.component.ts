import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/servicesForModels/user.service';
import { Address } from 'src/app/models/address';
import { PaymentInfo } from 'src/app/models/payment-info';
import { CopyObject } from 'src/app/app.utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  isLoading: boolean = false
  address: Address = new Address()
  paymentInfo: PaymentInfo = new PaymentInfo()

  constructor(public userService: UserService, private _snackBar: MatSnackBar) {
    this.address = CopyObject(this.userService.loggedUser.address)
    this.paymentInfo = CopyObject(this.userService.loggedUser.payment)
  }

  ngOnInit(): void {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 500)

  }

  updateInfo() {
    this.userService.loggedUser.address = this.address
    this.userService.loggedUser.payment = this.paymentInfo
    this.userService.updateUser(this.userService.loggedUser).subscribe(() => {
      this.openSnackBar('Información actualizada', 'Aceptar')
    }, err => {
      console.log('error')
    })


  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}

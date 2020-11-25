import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/servicesForModels/user.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { globalUrl } from '../app.utils';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  //Log in information
  public email: string
  public pass: string
  public remember: boolean
  public isPass: boolean = true
  public errorMessage: string

  //Registratation information
  public user: User
  public registrationPass: string
  public registrationPass2: string
  public isSubscribed: boolean
  public isAccept: boolean

  constructor(public userService: UserService, private router: Router, private _snackBar: MatSnackBar) {
    this.user = new User()
  }

  onLoginSubmit() {
    this.errorMessage = undefined
    if (this.email && this.pass) {
      var hash_pass = Md5.hashStr(this.pass).toString()
      this.userService.login(this.email, hash_pass).subscribe((user: User) => {
        if (user) {
          //Guardar en localstorage el user
          this.userService.loggedUser = user
          if (this.remember) {
            localStorage.setItem('BM_User', JSON.stringify({ email: user.email, hash_password: hash_pass }))
          }
          this.router.navigate(['/profile'])
        } else {
          this.errorMessage = "Has introducido un email o contraseña erróneo."
        }
      })
    } else {
      this.errorMessage = "Has introducido un email o contraseña erróneo."
    }
  }

  onRegisterSubmit() {
    this.errorMessage = undefined
    if (this.registrationPass && this.registrationPass2 && this.registrationPass == this.registrationPass2) {
      this.user.hash_password = Md5.hashStr(this.registrationPass).toString()

      this.userService.create(this.user).subscribe((user: any) => {
        if (user) {
          //Guardar en localstorage el user
          this.userService.loggedUser = user
          this.router.navigate(['/profile'])
        } else {
          this.errorMessage = "Has introducido un email o contraseña erróneo."
        }
      }, error => {
        console.log(error)
        if(error.error == "Ya existe un usuario registrado con este email."){
          this.openSnackBar('El email introducido ya está en la BBDD','Aceptar')
        }
      })
    } else {
      this.errorMessage = "Las contraseñas no coinciden"
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }



}

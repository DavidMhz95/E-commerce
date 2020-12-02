import { Component } from '@angular/core';
import { UserService } from 'src/app/servicesForModels/user.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';
import { User, ObjectType } from 'black-market-model';

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

  constructor(public userService: UserService, private router: Router) {
    this.user = new User(ObjectType.User)
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
      this.user.hashPassword = Md5.hashStr(this.registrationPass).toString()

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
      })
    } else {
      this.errorMessage = "Las contraseñas no coinciden"
    }
  }



}

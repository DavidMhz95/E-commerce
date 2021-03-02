import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../servicesForModels/user.service';
import { Subject, Observable, of } from 'rxjs';
import { User } from 'black-market-model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, public userService: UserService) { }

  canActivate(): Observable<boolean> {
    var observable: Observable<boolean>
    if (this.userService.loggedUser) {
      observable = of(true)
    } else {
      var subject = new Subject<boolean>();
      var user: User = JSON.parse(localStorage.getItem('BM_User'))
      if (user) {
        this.userService.login(user.email, user.hashPassword).subscribe((user: any) => {
          console.log(user)
          if (user) {
            this.userService.loggedUser = user
            subject.next(true)
          } else {
            this.router.navigate(['/registration'])
            subject.next(false)
          }
        })
        observable = subject
      } else {
        this.router.navigate(['/registration'])
        observable = of(false)
      }
    }
    return observable
  }
}

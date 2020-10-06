import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../servicesForModels/user.service';
import { User } from '../models/user';
import { Subject, Observable, of } from 'rxjs';

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
        this.userService.login(user.email, user.hash_password).subscribe((user: any) => {
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

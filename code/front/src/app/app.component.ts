import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './servicesForModels/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Black Market';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    var user: User = JSON.parse(localStorage.getItem('BM_User'))
    if (user) {
      this.userService.login(user.email, user.hash_password).subscribe((user: any) => {
        this.userService.loggedUser = user
      })
    }
  }
}

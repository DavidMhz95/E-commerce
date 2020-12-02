import { Component, OnInit } from '@angular/core';
import { UserService } from './servicesForModels/user.service';
import { User } from 'black-market-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Not Black Market';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    var user: User = JSON.parse(localStorage.getItem('BM_User'))
    if (user) {
      this.userService.login(user.email, user.hashPassword).subscribe((user: any) => {
        this.userService.loggedUser = user
      })
    }
  }
}

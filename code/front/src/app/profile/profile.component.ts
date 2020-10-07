import { Component, OnInit } from '@angular/core';
import { UserService } from '../servicesForModels/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public userService:UserService) { }

  ngOnInit(): void {
    console.log(this.userService.loggedUser)
  }

}

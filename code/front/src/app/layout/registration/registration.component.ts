import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { userService } from 'src/app/servicesForModels/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public user: User
  public hash_password2: string
  public status: string

  constructor(public userService: userService) {
    this.user = {
      name: '',
      surname: '',
      email: '',
      hash_password: '',
      type: 0,
      rol: 0
    }

  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.user.hash_password == this.hash_password2) {
      console.log(this.user)
      this.userService.create(this.user).subscribe(
        response =>{
          if(response.status == 'success'){
            this.status = 'success'
            this.user = response.user
                        
          }else if(response.status == "error"){
            this.status = response.message
          }
        },
        error =>{
          console.log(error)
          this.status = 'error'
  
        }
      )
      alert(this.status)
    }else{
      alert('Las password no coinciden')
    }
  }


}

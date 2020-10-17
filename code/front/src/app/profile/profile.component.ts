import { Component, OnInit } from '@angular/core';
import { UserService } from '../servicesForModels/user.service';
import { globalUrl } from '../app.utils';
import { FormBuilder, Validators } from '@angular/forms';
import { ImageService } from '../servicesForModels/image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  constructor(public userService: UserService, private imageService: ImageService) { }

  ngOnInit(): void {
    
  }

  public onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageService.upload(reader.result.toString()).subscribe((result: any) => {
          this.userService.loggedUser.image = result.id
          this.userService.updateUser(this.userService.loggedUser).subscribe((result: any) => {
            console.log("Usuario actualizado")
          })
        })
      }
    }
  }

}

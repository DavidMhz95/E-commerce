import { Component, OnInit } from '@angular/core';
import { UserService } from '../servicesForModels/user.service';
import { ImageService } from '../servicesForModels/image.service';
import { DomSanitizer } from '@angular/platform-browser';
import { OrderService } from '../servicesForModels/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public userService: UserService, private imageService: ImageService, public orderService: OrderService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    
  }

  public onFileChange(event:any) {
    const reader = new FileReader()
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.imageService.upload(reader.result.toString()).subscribe((result: any) => {
          this.userService.loggedUser.image = result.id
          this.userService.updateUser(this.userService.loggedUser).subscribe(() => {
            console.log("Usuario actualizado")
          })
        })
      }
    }
  }

}

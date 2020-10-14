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

  private imageSrc: string

  constructor(public userService: UserService, private fb: FormBuilder, private imageService: ImageService) { }

  ngOnInit(): void {
    if (this.userService.loggedUser.image) {
      this.imageSrc = globalUrl + "images/" + this.userService.loggedUser.image
    } else {
      this.imageSrc = "/assets/images/defaultProfile.png"
    }
    console.log(this.userService.loggedUser)
  }

  public formGroup = this.fb.group({
    file: [null, Validators.required]
  });


  public onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
        });
      };
    }
  }

  public onSubmit(): void {
    this.imageService.upload(undefined, this.formGroup.get('file').value).subscribe((result: any) => {
      this.userService.loggedUser.image = result.id
      this.imageSrc = globalUrl + "images/" + this.userService.loggedUser.image
      this.userService.updateUser(this.userService.loggedUser).subscribe((result: any) => {
        console.log("VAMOOOOS")
      })
    })
  }
}

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

  imageSrc = "/assets/images/defaultProfile.png"

  constructor(public userService: UserService, private fb: FormBuilder, private imageService: ImageService) { }

  ngOnInit(): void {
    console.log(this.userService.loggedUser)
  }

  public formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  private fileName;

  public onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
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
    this.imageService.upload(this.formGroup.get('file').value).subscribe((result: any) => {
      this.imageSrc = globalUrl + "images/" + result.id
    })
  }
}
